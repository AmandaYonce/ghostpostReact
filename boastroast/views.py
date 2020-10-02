from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class BoastRoastView(viewsets.ModelViewSet):
    queryset = BoastRoast.objects.all()
    serializer_class = BoastRoastSerializer

    @action(detail=False)
    def boast_view(self, request):
        postsort = BoastRoast.objects.filter(
            boast_roast=True).order_by('-timestamp')

        serializer = self.get_serializer(postsort, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def roast_view(self, request):
        roastsort = BoastRoast.objects.filter(
            boastRoast=False).order_by('-timestamp')

        serializer = self.get_serializer(roastsort, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def sort_votes_view(self, request):
        brsort = BoastRoast.objects.all()
        sorted_post = sorted(brsort, key=lambda x: (-x.votetotal))

        serializer = self.get_serializer(sorted_post, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def upvote_view(self, request, pk=None):
        post = self.get_object()
        post.upvote += 1
        post.save()

        return Response({'status': 'upvote'})

    @action(detail=True, methods=['get'])
    def downvote_view(self, request, pk=None):
        post = self.get_object()
        post.downvote -= 1
        post.save()

        return Response({'status': 'downvote'})