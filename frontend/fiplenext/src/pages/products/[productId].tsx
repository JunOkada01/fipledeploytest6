import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export interface ProductDetailType {
    id: number;
    product_name: string;
    category: {
        id: number;
        category_name: string;
    };
    subcategory: {
        id: number;
        subcategory_name: string;
    };
    gender: string;
    description: string;
    tags: Array<{
        id: number;
        tag_name: string;
    }>;
    variants: Array<{
        id: number;
        color: {
            id: number;
            color_name: string;
        };
        size: {
            id: number;
            size_name: string;
            order: number;
        };
        stock: number;
        price: number;
        status: string;
        images: Array<{
            id: number;
            image: string;
            image_description: string | null;
        }>;
    }>;
    created_at: string;
    is_active: boolean;
}

const ProductDetail: React.FC = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState<ProductDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null); // メッセージの状態

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
                setProduct(response.data);
                if (response.data.variants[0]?.images[0]) {
                setSelectedImage(`http://127.0.0.1:8000/${response.data.variants[0].images[0].image}`);
                setSelectedColor(response.data.variants[0].color.color_name);
                }
            } catch (err) {
                setError('商品情報の取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [productId]);
    
    if (loading) return <div className="container mx-auto p-4">読み込み中...</div>;
    if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
    if (!product) return null;
    
    /* 選択したカラーによる切り替え */
    const groupedVariants = product.variants.reduce((acc, variant) => {
        const colorName = variant.color.color_name;
        if (!acc[colorName]) {
            acc[colorName] = [];
        }
        acc[colorName].push(variant);
        return acc;
    }, {} as Record<string, typeof product.variants>);
    
    // サイズの昇順ソートを行う
    Object.keys(groupedVariants).forEach(colorName => {
        groupedVariants[colorName].sort((a, b) => a.size.order - b.size.order); // size.orderで昇順ソート
    });

    const selectedVariants = selectedColor
        ? groupedVariants[selectedColor]
        : product.variants;

    // 商品をカートに追加する関数
    const addToCart = async (productId: number) => {
        const access_token = localStorage.getItem('access_token');
        try {
        const response = await axios.post(
            'http://localhost:8000/api/cart/add/',
            { product_id: productId, quantity: 1 },
            {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            }
        );
        setMessage(response.data.message); // 成功メッセージを表示
        } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setMessage(error.response.data.error || '商品の追加に失敗しました');
        } else {
            setMessage('エラーが発生しました');
        }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row">
                {/* 左側: 商品画像セクション */}
                <div className="md:w-1/2 mb-4">
                    <div className="border overflow-hidden">
                        {selectedImage && (
                        <img 
                            className="w-full h-auto aspect-[3/4]"
                            src={selectedImage}
                            alt={product.product_name}
                            style={{ objectFit: 'cover' }}
                        />
                        )}
                    </div>

                    {/* カラー選択ボタン（画像の下に移動） */}
                    <div className="flex gap-2 mt-4">
                        {Object.keys(groupedVariants).map(colorName => (
                        <button
                            key={colorName}
                            className={`px-2 py-1 border rounded-lg ${selectedColor === colorName ? 'bg-white text-black' : 'bg-gray-300'}`}
                            onClick={() => {
                            setSelectedColor(colorName);
                            const firstImage = groupedVariants[colorName][0]?.images[0];
                            if (firstImage) {
                                setSelectedImage(`http://127.0.0.1:8000/${firstImage.image}`);
                            }
                            }}
                        >
                            {colorName}
                        </button>
                        ))}
                    </div>

                    {/* サムネイル画像一覧 */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-4">
                        {selectedVariants.flatMap(variant =>
                            variant.images.map(image => {
                                const imageUrl = `http://127.0.0.1:8000/${image.image}`;
                                return (
                                    <div
                                        key={image.id}
                                        className={`relative cursor-pointer border ${
                                            selectedImage === imageUrl ? 'border-gray-500' : 'border-gray-300'
                                        } overflow-hidden`}
                                        onClick={() => setSelectedImage(imageUrl)}
                                    >
                                        <img
                                            className="w-full h-auto transition-transform duration-300 hover:scale-105"
                                            style={{ objectFit: 'cover' }}
                                            src={imageUrl}
                                            alt={image.image_description || product.product_name}
                                        />
                                    </div>
                                );
                            })
                        )}
                    </div>


                    {/* 商品説明 */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">商品説明</h3>
                        <p className="mt-2 text-gray-600">{product.description}</p>
                    </div>
                    {/* タグ */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                        <span 
                            key={tag.id}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                        >
                            {tag.tag_name}
                        </span>
                        ))}
                    </div>
                </div>
        
                {/* 右側: 商品情報テーブル */}
                <div className="md:w-1/2 md:pl-6 mt-6">
                    <div className="mb-4">
                        <h1 className="text-2xl">{product.product_name}</h1>
                        <div className="text-sm text-gray-600">
                        {product.category.category_name} &gt; {product.subcategory.subcategory_name}
                        </div>
                    </div>
        
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-300 p-2 text-left">カラー</th>
                                <th className="border-b border-gray-300 p-2 text-left">サイズ</th>
                                <th className="border-b border-gray-300 p-2 text-left">価格</th>
                                <th className="border-b border-gray-300 p-2 text-left">在庫状況</th>
                                <th className="border-b border-gray-300 p-2 text-left">アクション</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.entries(groupedVariants).map(([colorName, variants]) => (
                            <React.Fragment key={colorName}>
                            {variants.map((variant, index) => (
                                /* カラー */
                                <tr key={variant.id} className="">
                                    {index === 0 && (
                                        <td 
                                        className="border-b border-gray-300 p-2" 
                                        rowSpan={variants.length}
                                        >
                                        {colorName}
                                        </td>
                                    )}
                                    <td className="border-b text-center border-gray-300 p-2">
                                        {variant.size.size_name}
                                    </td>
                                    <td className="border-b border-gray-300 p-2">
                                        ¥{variant.price.toLocaleString()}
                                    </td>
                                    <td className="border-b border-gray-300 p-2">
                                        {variant.stock > 0 ? (
                                        <span className="text-green-600">在庫あり</span>
                                        ) : (
                                        <span className="text-red-600">在庫なし</span>
                                        )}
                                    </td>
                                    <td className="border-b border-gray-300 p-2">
                                        <Link href={'/cart'}>
                                            <button
                                                className={`relative w-[170px] h-auto border px-6 py-2 overflow-hidden group ${
                                                    variant.stock > 0
                                                        ? 'border-black text-black'
                                                        : 'border-gray-400 bg-gray-400 text-white cursor-not-allowed'
                                                }`}
                                                onClick={() => variant.stock > 0 && addToCart(variant.id)}
                                                disabled={variant.stock === 0}
                                            >
                                                <span
                                                    className={`absolute inset-0 ${
                                                        variant.stock > 0 ? 'bg-black' : ''
                                                    } transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0`}
                                                ></span>
                                                <span
                                                    className={`relative ${
                                                        variant.stock > 0
                                                            ? 'text-black group-hover:text-white'
                                                            : 'text-white'
                                                    } transition-colors duration-300 ease-in-out`}
                                                >
                                                    {variant.stock > 0 ? 'カートに入れる' : '入荷待ち'}
                                                </span>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
        
                    {/* 追加情報 */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">商品情報</h3>
                        <div className="mt-2 space-y-2">
                            <div className="flex border-b py-2">
                                <span className="w-32 text-gray-600">性別</span>
                                <span>{product.gender}</span>
                            </div>
                            <div className="flex border-b py-2">
                                <span className="w-32 text-gray-600">商品番号</span>
                                <span>{product.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };
export default ProductDetail;