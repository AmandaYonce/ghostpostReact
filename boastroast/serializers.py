from rest_framework import serializers
from .models import *


class BoastRoastSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BoastRoast
        fields = ['id', 'boastRoast', 'content', 'upvote', 'downvote', 'timestamp', 'votetotal']