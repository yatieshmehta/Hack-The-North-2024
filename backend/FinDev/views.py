from django.shortcuts import render
#from rest_framework_simplejwt.tokens import RefreshToken
import json
from django.views.decorators.csrf import csrf_exempt

from .serializers import *
from django.core import serializers
from django.conf import settings
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
#from rest_framework_simplejwt.authentication import JWTAuthentication
#from rest_framework_simplejwt.tokens import AccessToken
from .models import *
from .serializers import *
from datetime import datetime
from django.db.models import Q

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    if request.method == 'POST':

        user_serializer = UsersSerializer(data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'data': user_serializer.data}, status=200)
        else:
            return Response({'error': user_serializer.errors}, 400)
        

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def sign_in(request):
    if request.method == 'POST':
        try:
            user = Users.objects.get(username=request.data['username'])
        except Exception as e:
            return Response({'error': str(e)}, 400)
        
        if request.data['password'] == user.password:
            serializer = UsersSerializer(user)
            return Response({'data': serializer.data}, status=200)
        else:
            return Response({'error': 'Incorrect password'}, 400)