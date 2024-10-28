from django.urls import path
from . import views
from .views import *
from django.views.generic import TemplateView

app_name = 'fipleapp'

urlpatterns = [
    path('data/', data_view, name='data'),
    path('users/', views.user_list, name='user-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin_create/', admin_create, name='admin_create'),
    path('admin_login/', admin_login, name='admin_login'),
    path('', AdminTop.as_view(), name='admin_top'),
    path('admin_logout/', admin_logout, name='admin_logout'),
    path('categories/', CategoryListView.as_view(), name='category_list'),
    path('categories/add/', CategoryCreateView.as_view(), name='category_add'),
    path('categories/delete/<int:pk>/', CategoryDeleteView.as_view(), name='category_delete'),
    path('subcategories/', SubCategoryListView.as_view(), name='subcategory_list'),
    path('subcategories/add/', SubCategoryCreateView.as_view(), name='subcategory_add'),
    path('subcategories/delete/<int:pk>/', SubCategoryDeleteView.as_view(), name='subcategory_delete'),
    path('colors/', ColorListView.as_view(), name='color_list'),
    path('colors/add/', ColorCreateView.as_view(), name='color_add'),
    path('colors/delete/<int:pk>/', ColorDeleteView.as_view(), name='color_delete'),
    path('sizes/', SizeListView.as_view(), name='size_list'),
    path('sizes/add/', SizeCreateView.as_view(), name='size_add'),
    path('sizes/delete/<int:pk>/', SizeDeleteView.as_view(), name='size_delete'),
    path('product-origins/', ProductOriginListView.as_view(), name='product_origin_list'),
    path('product-origins/add/', ProductOriginCreateView.as_view(), name='product_origin_add'),
    path('product-origins/edit/<int:pk>/', ProductOriginUpdateView.as_view(), name='product_origin_edit'),
    path('product-origins/delete/<int:pk>/', ProductOriginDeleteView.as_view(), name='product_origin_delete'),
    path('products/', ProductListView.as_view(), name='product_list'),
    path('products/add/', ProductCreateView.as_view(), name='product_add'),
    path('products/edit/<int:pk>/', ProductUpdateView.as_view(), name='product_edit'),
    path('products/delete/<int:pk>/', ProductDeleteView.as_view(), name='product_delete'),
    path('tags/', TagListView.as_view(), name='tag_list'),
    path('tags/add/', TagCreateView.as_view(), name='tag_add'),
    path('tags/edit/<int:pk>/', TagUpdateView.as_view(), name='tag_edit'),
    path('tags/delete/<int:pk>/', TagDeleteView.as_view(), name='tag_delete'),
    path('product-tags/', ProductTagListView.as_view(), name='product_tag_list'),
    path('product-tags/add/', ProductTagCreateView.as_view(), name='product_tag_add'),
    path('product-tags/edit/<int:pk>/', ProductTagUpdateView.as_view(), name='product_tag_edit'),
    path('product-tags/delete/<int:pk>/', ProductTagDeleteView.as_view(), name='product_tag_delete'),
]