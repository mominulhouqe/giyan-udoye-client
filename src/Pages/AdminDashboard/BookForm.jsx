import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const IMG_URL = "https://api.imgbb.com/1/upload";
const IMG_API_KEY = import.meta.env.VITE_IMG_API_KEY; // Add your ImgBB API key here

const BookForm = ({ book, visible, onOk, onCancel }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImage = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        formData.append("key", IMG_API_KEY);

        const response = await axios.post(IMG_URL, formData);
        if (response.data && response.data.data && response.data.data.url) {
          setImageUrl(response.data.data.url);
        } else {
          throw new Error("Failed to get image URL.");
        }
      } catch (error) {
        console.log(error);
        message.error("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (book) {
      reset({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        image: book.image || "",
      });
      setImageFile(
        book.image
          ? new File([book.image], "image", { type: "image/jpeg, image/png" })
          : null
      );
      setImageUrl(book.image || "");
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const updatedBook = {
        ...data,
        image: imageUrl,
      };

      onOk(updatedBook);
    } catch (err) {
      message.error(`Failed to save book: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      title={book?._id ? "Edit Book" : "Add Book"}
      open={visible}
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
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item
          label="Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Author"
          validateStatus={errors.author ? "error" : ""}
          help={errors.author?.message}
        >
          <Controller
            name="author"
            control={control}
            rules={{ required: "Author is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item label="Image">
          <input type="file" onChange={handleImage} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
        </Form.Item>
      </Form>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
    </Modal>
  );
};

export default BookForm;
