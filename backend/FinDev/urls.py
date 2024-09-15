from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as auth_views
from django.http import JsonResponse

#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('sign-up/', views.sign_up, name='sign_up'),
    path('sign-in/', views.sign_in, name='sign_in'),
    path('delete-user/', views.delete_user, name='delete_user'),
    path('add-post/', views.add_post, name='add_post'),
    path('delete-post/<int:post_id>/', views.delete_post, name='delete_post'),
    path('get-posts/', views.get_posts, name='get_posts'),
    path('get-post/<int:post_id>/', views.get_post, name='get_post'),
    path('apply-to-post/<int:post_id>/', views.apply_to_post, name='apply_to_post'),
    path('get-user-posts/', views.get_user_posts, name='get_user_posts'),
    path('view-applicants/<int:post_id>/', views.view_applicants, name='view_applicants'),
    path('match-applicant/<int:post_id>/<int:user_id>/', views.match_applicant, name='match_applicant'),
    path('get-user-data/', views.get_user_data, name='get_user_data'),
    path('api/test/', views.testapicall, name='testapicall')

    
]