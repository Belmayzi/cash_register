from django.db import models
import os


def get_image_path(instance, filename):
    return os.path.join("theapp/static/theapp/images", str(instance.id), filename)


class Products(models.Model):
    name = models.CharField(max_length=30)
    price = models.FloatField()
    image = models.ImageField(null=True, blank=True, upload_to=get_image_path)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return self.name
