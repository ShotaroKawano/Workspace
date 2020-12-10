# Generated by Django 3.0.8 on 2020-09-18 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.TextField()),
                ('stock_count', models.IntegerField()),
            ],
            options={
                'db_table': 'stock',
            },
        ),
    ]