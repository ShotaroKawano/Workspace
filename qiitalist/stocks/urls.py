from django.conf.urls import include, url
from rest_framework import routers

from stocks.views import StockViewSet, index

router = routers.DefaultRouter()
router.register(r'stock', StockViewSet)

urlpatterns = [
    # qiita/api/stock/
    url(r'api/', include(router.urls)),
    # qiita/
    url(r'', index, name='index'),
]
