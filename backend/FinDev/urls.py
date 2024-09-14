from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as auth_views
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('sign-up/', views.sign_up, name='sign_up'),
    path('sign-in/', views.sign_in, name='sign_in'),

]