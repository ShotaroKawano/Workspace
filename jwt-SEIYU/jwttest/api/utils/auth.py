import time
import jwt
from jwttest.settings import SECRET_KEY
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from rest_framework import exceptions

from api.models import UserInfo

class NormalAuthentication(BaseAuthentication):
    def authenticate(self, request):
        username = request._request.POST.get("username")
        password = request._request.POST.get("password")
        user_obj = UserInfo.objects.filter(username=username).first()
        if not user_obj:
            raise exceptions.AuthenticationFailed('認証失敗')
        elif user_obj.password != password:
            raise exceptions.AuthenticationFailed('パスワードあってません')
        token = generate_jwt(user_obj)
        return (token, None)

    def authenticate_header(self, request):
        pass

# 先程インストールしたjwtライブラリでTokenを生成します
# Tokenの内容はユーザーの情報とタイムアウトが含まれてます
# タイムアウトのキーはexpであることは固定してます
# ドキュメント: https://pyjwt.readthedocs.io/en/latest/usage.html?highlight=exp
def generate_jwt(user):
    timestamp = int(time.time()) + 60*60*24*7
    return jwt.encode(
        {"userid": user.pk, "username": user.username, "info": user.info, "exp": timestamp},
        SECRET_KEY).decode("utf-8")



class JWTAuthentication(BaseAuthentication):
    keyword = 'JWT'
    model = None

    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = "Authorization 無効"
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = "Authorization 無効 スペースはない"
            raise exceptions.AuthenticationFailed(msg)

        try:
            jwt_token = auth[1]
            jwt_info = jwt.decode(jwt_token, SECRET_KEY)
            userid = jwt_info.get("userid")
            try:
                user = UserInfo.objects.get(pk=userid)
                user.is_authenticated = True
                return (user, jwt_token)
            except:
                msg = "ユーザー存在しません"
                raise exceptions.AuthenticationFailed(msg)
        except jwt.ExpiredSignatureError:
            msg = "tokenはタイムアウトしました"
            raise exceptions.AuthenticationFailed(msg)

    def authenticate_header(self, request):
        pass
