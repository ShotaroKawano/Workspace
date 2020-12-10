from rest_framework.views import APIView
from rest_framework.response import Response

from .utils.auth import NormalAuthentication
from .utils.auth import JWTAuthentication



class Login(APIView):

    authentication_classes = [NormalAuthentication,]

    def post(self, request, *args, **kwargs):
        return Response({"token": request.user})



from rest_framework.permissions import IsAuthenticated

class Something(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        return Response({"data": "中身です"})
