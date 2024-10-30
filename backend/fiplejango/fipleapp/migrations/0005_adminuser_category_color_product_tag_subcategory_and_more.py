# Generated by Django 4.2.6 on 2024-10-30 00:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fipleapp', '0004_alter_customuser_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('is_superuser', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
            ],
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color_name', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock', models.PositiveIntegerField()),
                ('price', models.IntegerField()),
                ('status', models.CharField(choices=[('予約販売', '予約販売'), ('販売中', '販売中'), ('在庫切れ', '在庫切れ')], max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.color')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subcategory_name', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subcategories', to='fipleapp.category')),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size_name', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
            ],
        ),
        migrations.CreateModel(
            name='ProductOrigin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=255)),
                ('gender', models.CharField(choices=[('男性', '男性'), ('女性', '女性'), ('その他', 'その他')], max_length=10)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.category')),
                ('subcategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.subcategory')),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='product_images/')),
                ('image_description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='product_origin',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.productorigin'),
        ),
        migrations.AddField(
            model_name='product',
            name='size',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.size'),
        ),
        migrations.CreateModel(
            name='ProductTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.adminuser')),
                ('product_origin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.productorigin')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fipleapp.tag')),
            ],
            options={
                'unique_together': {('product_origin', 'tag')},
            },
        ),
    ]
