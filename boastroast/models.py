from django.db import models
from django.utils.timezone import now
import random
import string


class BoastRoast(models.Model):
    CHOICES = ((True, 'Boast'), (False, "roast"))
    boastRoast = models.BooleanField(choices=CHOICES)
    content = models.CharField(max_length=200, null=True)
    upvote = models.IntegerField(blank=True, null=True, default=0)
    downvote = models.IntegerField(blank=True, null=True, default=0)
    timestamp = models.DateTimeField(default=now, editable = False)

    @property
    def votetotal(self):
        return self.upvote + self.downvote