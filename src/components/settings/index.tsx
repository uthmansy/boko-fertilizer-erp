import { Button, Form, Input, Avatar } from "antd";
import { FieldConfig } from "../../types/comps";
import FormBuilder from "../utils/FormBuilder";
import { MdModeEdit } from "react-icons/md";
import { useSettings } from "../../hooks/useSettings";

const Settings = () => {
  const {
    userProfile,
    isEditing,
    isEditingPicture,
    isLoading,
    handleEditToggle,
    handleSubmit,
    setIsEditingPicture,
  } = useSettings();

  const [form] = Form.useForm();
  const [profilePictureForm] = Form.useForm();

  if (!userProfile) {
    return <div className="p-4">Loading user profile...</div>;
  }

  const pictureFormConfig: FieldConfig[] = [
    {
      name: "image",
      label: "",
      type: "image",
      required: false,
    },
  ];

  return (
    <div className="max-w-2xl p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative group">
          <Avatar
            src={userProfile.avatar_url}
            size={64}
            className="bg-gray-200 border cursor-pointer hover:opacity-80 transition-opacity"
          >
            {userProfile.full_name?.[0]?.toUpperCase()}
          </Avatar>

          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditingPicture(true)}
                className="text-white hover:text-gray-200"
                title="Edit profile picture"
              >
                <MdModeEdit className="text-white" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{userProfile.full_name}</h1>
          <p className="text-gray-600">@{userProfile.username}</p>
        </div>
      </div>

      {isEditingPicture && (
        <>
          <Button
            onClick={() => setIsEditingPicture(false)}
            type="default"
            className="mb-5"
          >
            Cancel
          </Button>
          <FormBuilder
            form={profilePictureForm}
            formConfig={pictureFormConfig}
            onSubmit={handleSubmit}
            loading={isLoading}
          />
        </>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          full_name: userProfile.full_name,
          avatar_url: userProfile.avatar_url,
        }}
      >
        <Form.Item label="Username">
          <Input value={userProfile.username || undefined} disabled />
        </Form.Item>

        <Form.Item label="Role">
          <Input value={userProfile.role || undefined} disabled />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <div className="flex gap-4 mt-8">
          {isEditing && (
            <>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Save Changes
              </Button>
              <Button onClick={handleEditToggle} disabled={isLoading}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </Form>
      {!isEditing && (
        <Button type="primary" onClick={handleEditToggle}>
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default Settings;
