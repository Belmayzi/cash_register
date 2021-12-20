# Generated by Django 3.2.7 on 2021-12-19 13:31

from django.db import migrations, models
import theapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('theapp', '0008_products_selected'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=theapp.models.get_image_path),
        ),
    ]
