import IconButton from '@/components/IconButton';
import React, { useState } from 'react'

interface CreatePostInterface {
    userImage: string;

}

const CreatePost = ({ userImage }: CreatePostInterface) => {

    const [inputFocused, setInputFocused] = useState<boolean>(false)
    const [inputText, setInputText] = useState<string>("")
    const [images, setImages] = useState<any>([])


    const uploadImage = async () => {
        try {
            // Open file picker
            const [fileHandle] = await (window as any).showOpenFilePicker({
                types: [
                    {
                        description: 'Images',
                        accept: {
                            'image/*': ['.png', '.jpg', '.jpeg'],
                        },
                    },
                ],
            });

            const validExtensions = ['png', 'jpg', 'jpeg']
            // Get the selected file
            const file = await fileHandle.getFile();
            console.log(file);
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                alert('Invalid file type selected. Please select an image file.');
                return
            }

            setImages([...images, file])

        }
        catch (error) {
            console.error('File selection was canceled or failed', error);
        }
    }

    const removeImage = (index: number) => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return (
        <div className='bg-white p-[20px] w-full rounded-[15px] flex flex-col gap-[10px]'>

            <div className='flex-1 flex gap-[10px] w-full justify-end items-end'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                    <img src={userImage} alt="" className='w-full h-full ' />

                </div>

                <div className={`flex-1  flex flex-col justify-between items-start gap-[10px]`}>
                    {/* Images */}
                    {
                        images.length !== 0 && <div className='pt-[5px] flex gap-[10px]'>
                            {images.map((image: any, index: number) => (
                                <div key={index} className='w-[150px] h-[150px] rounded-[10px] overflow-hidden relative group' >
                                    <img src={URL.createObjectURL(image)} alt="" className='w-full h-full ' />
                                    <button onClick={() => removeImage(index)} className='absolute inset-0 hidden group-hover:flex justify-center items-center bg-[#0005] cursor-pointer'>
                                        <img src="/assets/trash.svg" alt="" className='w-[40px] h-[40px]  ' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    }

                    {/* Input */}
                    <div className={`flex justify-between items-center w-full border-[3px] border-solid ${inputFocused ? "border-primaryColorLight" : "border-accentColorLight"} rounded-[15px]  px-[15px] py-[5px]`}>
                        <input
                            type='text'
                            onChange={(e) => setInputText(e.target.value)}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            placeholder='Share your thoughts...'
                            className='flex-1 focus:outline-none text-[16px] placeholder:text-primaryColorLight font-medium text-primaryColorLight'
                        />

                        <button onClick={uploadImage} className=' p-[8px]  rounded-full flex justify-center items-center' >
                            <img src='/assets/add-image-outlined.svg' alt="" />
                        </button>
                    </div>
                </div>

            </div>
            {inputText !== "" && <div className='flex justify-end'>
                <button className='text-white bg-primaryColorLight px-[15px] py-[5px] text-[16px] font-medium rounded-[10px]'>Post</button>
            </div>}
        </div>
    )
}

export default CreatePost