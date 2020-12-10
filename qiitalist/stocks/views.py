import os

from django.conf import settings
from django.http.response import HttpResponse
from rest_framework import viewsets

from stocks.models import Stock
from stocks.serializer import StockSerializer

# 静的ファイルを返すView
def index(_):
    # render等でDjangoのtemplateとして処理すると「{{}}」がVue.jsに渡る前消えてしまう。
    # 良い解決方法が浮かばなかったので、static配下に置いたファイルをopenして投げることで回避。
    html = open(
        os.path.join(settings.STATICFILES_DIRS[0], "vue_grid.html")).read()
    return HttpResponse(html)

# RestAPIのviewsets
class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    # APIのフィルタで使えるフィールドを指定
    filter_fields = ("id", "title", 'stock_count')
