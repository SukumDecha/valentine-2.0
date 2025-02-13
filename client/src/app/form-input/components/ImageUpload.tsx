"use client"

import type React from "react"
import { Upload, message, Input, Button, Card, Space, Typography, Image } from "antd"
import { InboxOutlined, DeleteOutlined, HeartOutlined } from "@ant-design/icons"
import { useImageUpload } from "@/hooks/useImage"
import { useRef } from "react"

const { Text } = Typography

interface IProps {
  uuid_slug: string
}

export const ImageUpload = ({ uuid_slug }: IProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { images, isUploading, error, success, addImages, removeImage, updateImageText, uploadImages } =
    useImageUpload(uuid_slug)



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addImages(Array.from(e.target.files))
      e.target.value = '' // Reset the input
    }
  }


  const handleUpload = async () => {
    try {
      await uploadImages()
    } catch (err) {
      message.error("Failed to upload images. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Space direction="vertical" size="large" className="w-full">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-pink-50 border-2 border-dashed border-pink-300 hover:border-pink-400 
                     rounded-lg p-8 text-center cursor-pointer transition-colors"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-pink-500 text-3xl" />
          </p>
          <p className="text-gray-600 mb-2">Click or drag images here</p>
          <p className="text-sm text-gray-500">Support JPG, JPEG, PNG, GIF (max 20MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {error && (
          <Text type="danger" className="text-red-500">
            {error}
          </Text>
        )}
        {success && (
          <Text type="success" className="text-green-500">
            {success}
          </Text>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image) => (
            <Card
              key={image.id}
              size="small"
              className="border-pink-300 hover:shadow-md transition-shadow"
              cover={
                <Image
                  alt="Preview"
                  src={image.preview || "/placeholder.svg"}
                  className="min-h-48 object-cover w-full"
                />
              }
              actions={[
                <Button
                  key="delete"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeImage(image.id)}
                  className="flex items-center gap-1 hover:text-pink-600 focus:ring-2 focus:ring-pink-500"
                >
                  Click to remove
                </Button>,
              ]}
            >
              <Input
                placeholder="Enter image description"
                value={image.text}
                onChange={(e) => updateImageText(image.id, e.target.value)}
                prefix={<HeartOutlined className="text-pink-500" />}
                className="border-pink-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </Card>
          ))}
        </div>

        {images.length > 0 && (
          <Button
            type="primary"
            onClick={handleUpload}
            loading={isUploading}
            icon={<HeartOutlined />}
          >
            Upload {images.length} Image{images.length > 1 ? "s" : ""}
          </Button>
        )}
      </Space>
    </div>
  )
}