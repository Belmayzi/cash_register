# Generated by Django 3.2.7 on 2021-12-09 10:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('theapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='products',
            old_name='product_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='products',
            old_name='Products_price',
            new_name='price',
        ),
    ]
