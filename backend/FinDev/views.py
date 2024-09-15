from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
import json
from django.views.decorators.csrf import csrf_exempt

from .serializers import *
from django.core import serializers
from django.conf import settings
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from .models import *
from .serializers import *
from datetime import datetime
from django.db.models import Q
from django.http import JsonResponse


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    if request.method == 'POST':

        user_serializer = UsersSerializer(data=request.data)

        if user_serializer.is_valid():
            user = user_serializer.save()
            tokens = get_tokens_for_user(user)

            return Response({'data': user_serializer.data, 'refresh_token': tokens['refresh'], 'access_token': tokens['access']}, status=200)
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
            serializer = UsersSerializer(user, many=False)
            tokens = get_tokens_for_user(user)
            return Response({'data': serializer.data, 'refresh_token': tokens['refresh'], 'access_token': tokens['access']}, status=200)
        else:
            return Response({'error': 'Incorrect password'}, 400)
        

@csrf_exempt
@api_view(['POST'])
def delete_user(request):
    if request.method == 'POST':
        user = request.user
        user.delete()
        return Response({'message': 'Account successfully deleted'}, status=200)
    

@csrf_exempt
@api_view(['POST'])
def add_post(request):
    if request.method == 'POST':
        serializer = PostsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user_id=request.user)
            return Response({'post': serializer.data}, status=200)
        else:
            return Response({'error': serializer.errors}, status=400)
        

@csrf_exempt
@api_view(['POST'])
def delete_post(request, post_id):
    if request.method == 'POST':
        post = Posts.objects.get(user=request.user, post_id=post_id)
        post.delete()
        return Response({'message': 'Post deleted successfully'}, status=400)
    

@csrf_exempt
@api_view(['POST'])
def get_posts(request):
    if request.method == 'POST':
        posts = Posts.objects.filter(role=request.user.role, matched__isnull=False)
        posts_serializer = PostsSerializer(posts, many=True)
        return Response({'posts': posts_serializer.data}, status=200)


@csrf_exempt
@api_view(['POST'])
def get_post(request, post_id):
    if request.method == 'POST':
        post = Posts.objects.get(post_id=post_id)
        post_serializer = PostsSerializer(post, many=False)
        return Response({'post': post_serializer.data}, status=200)
    

@csrf_exempt
@api_view(['POST'])
def apply_to_post(request, post_id):
    if request.method == 'POST':
        post = Posts.objects.get(post_id=post_id)
        #if request.user not in post.applicants.all():
        post.applicants.add(request.user)
        post.save()
        return Response({'message': 'Applied successfully'}, status=200)


@csrf_exempt
@api_view(['POST'])
def get_user_posts(request):
    if request.method == 'POST':
        posts = Posts.objects.filter(user_id=request.user, matched__isnull=False)
        posts_serializer = PostsSerializer(posts, many=True)
        return Response({'posts': posts_serializer.data}, status=200)
    

@csrf_exempt
@api_view(['POST'])
def view_applicants(request, post_id):
    if request.method == 'POST':
        post = Posts.objects.get(post_id=post_id)
        return Response({'applicants': post.applicants}, status=200)


@csrf_exempt
@api_view(['POST'])
def match_applicant(request, post_id, user_id):
    if request.method == 'POST':
        post = Posts.objects.get(post_id=post_id)
        applicant = Users.objects.get(id=user_id)
        post.matched = applicant
        post.save()
        return Response({'message': 'Successfully matched'}, status=200)


@csrf_exempt
@api_view(['POST'])
def get_user_data(request, user_id):
    if request.method == 'POST':
        user = Users.objects.get(user_id=user_id)
        user_serializer = UserInfoSerializer(user, many=False)
        return Response({'data': user_serializer.data}, status=200) 
    

@csrf_exempt
@api_view(['POST'])
def get_or_create_chat(request, post_id):
    if request.method == 'POST':
        post = Posts.objects.get(post_id=post_id)
        chat = Chat.objects.get_or_create(post_id=post, user1=request.user, user2=post.user_id)
        chat_serializer = ChatSerializer(chat, many=False)
        if chat.used == 0:
            return Response({'chat': chat_serializer.data, 'messages': None}, 200)
        else:
            messages = chat.messages.all().oreder_by('sent_at')
            messages_serializer = MessageSerializer(messages, many=True)
            return Response({'chat': chat_serializer.data, 'messages': messages_serializer.data}, 200)



@csrf_exempt
@api_view(['POST'])
def send_message(request, chat_id):
    if request.method == 'POST':
        chat = Chat.objects.get(chat_id=chat_id)
        message = Message.objects.create(chat=chat, sender=request.user, content=request.data['message'])
        chat.used = 1
        chat.save()
        message
    
def testapicall(request):
    return JsonResponse({"message": "wpifubfi3"})