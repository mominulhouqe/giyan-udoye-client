import { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const img_hosting_token = import.meta.env.VITE_Image_Upload_tokens;

const BookForm = ({ book, visible, onOk, onCancel }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // Added to hold the image URL

  useEffect(() => {
    if (book) {
      reset({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        image: book.image || ""
      });
      setImageFile(book.image ? new File([book.image], 'image', { type: 'image/jpeg' }) : null);
      setImageUrl(book.image || ""); // Initialize imageUrl if book has an image
    }
  }, [book, reset]);

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      setImageFile(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error("Image upload failed.");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const response = await fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    });

    const imgResponse = await response.json();

    if (imgResponse.success) {
      return imgResponse.data.display_url;
    } else {
      throw new Error(imgResponse.error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const updatedBook = {
        ...data,
        image: finalImageUrl
      };

      onOk(updatedBook);
    } catch (err) {
      message.error(`Failed to upload image: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={book?._id ? "Edit Book" : "Add Book"}
      visible={visible}
      onOk={handleSubmit(onSubmit)}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Title" validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item label="Author" validateStatus={errors.author ? 'error' : ''} help={errors.author?.message}>
          <Controller
            name="author"
            control={control}
            rules={{ required: 'Author is required' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item label="Description" validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item label="Image">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Upload
                listType="picture"
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleUploadChange}
                fileList={imageFile ? [{ uid: '-1', name: 'current image', status: 'done', url: URL.createObjectURL(imageFile) }] : []}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            )}
          />
        </Form.Item>
      </Form>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
    </Modal>
  );
};

export default BookForm;
