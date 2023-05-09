from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    path('producto', Producto_APIView.as_view()),
    path('user/login', UserViewSet.as_view({'post': 'login'})),
]