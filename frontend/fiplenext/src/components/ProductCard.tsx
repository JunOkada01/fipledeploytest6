import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShirt } from '@fortawesome/free-solid-svg-icons';

const ProductCard: React.FC = () => {
    const [isTryingOn, setIsTryingOn] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleTryingOn = () => setIsTryingOn((prev) => !prev);
    const toggleFavorited = () => setIsFavorited((prev) => !prev);

    return (
        <div className="bg-white rounded-sm border border-gray-200 w-full sm:max-w-[200px] md:max-w-[250px] lg:max-w-sm mx-auto">
            <Link href={`/product/detail/`}>
                <div className="relative w-full aspect-[3/4]">
                    <Image 
                        src="/sample_item.png" 
                        alt="商品画像" 
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </Link>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-xs sm:text-[10px]">カテゴリ/サブカテゴリ</p>
                </div>
                <p className="text-gray-900 text-base sm:text-lg mt-1">¥5,800</p>

                <div className="flex justify-end mt-2 space-x-10 sm:space-x-16 lg:space-x-20">
                    <div 
                        onClick={toggleTryingOn} 
                        className={`cursor-pointer transition-all duration-150 ${isTryingOn ? 'text-black' : 'text-gray-300 hover:text-gray-200'}`}
                    >
                        <FontAwesomeIcon 
                            icon={faShirt} 
                            className="text-md transition-all duration-150" 
                        />
                    </div>

                    <div 
                        onClick={toggleFavorited} 
                        className={`cursor-pointer transition-all duration-150 ${isFavorited ? 'text-red-500' : 'text-red-300 hover:text-red-200'}`}
                    >
                        <FontAwesomeIcon 
                            icon={faHeart} 
                            className="text-md transition-all duration-150" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
