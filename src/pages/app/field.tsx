import React, { useState, ChangeEvent } from "react";
import { Form, Input, Typography, Button, Divider } from "antd";
import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandWhatsapp,
  BrandYoutube,
  BrandFacebook,
  BrandGithub,
  Mail,
  Link,
  MapPin,
  Phone,
} from "tabler-icons-react";
import { CgWebsite } from "react-icons/cg";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const mockdata = [
  { title: "Phone", icon: Phone, color: "green", bg: "bg-green-200" },
  { title: "Email", icon: Mail, color: "orange", bg: "bg-orange-200" },
  { title: "Address", icon: MapPin, color: "blue", bg: "bg-blue-200" },
  { title: "Website", icon: CgWebsite, color: "maroon", bg: "bg-amber-200" },
  { title: "Link", icon: Link, color: "indigo", bg: "bg-blue-200" },
  { title: "Github", icon: BrandGithub, color: "gray", bg: "bg-gray-200" },
  { title: "Twitter", icon: BrandTwitter, color: "blue", bg: "bg-sky-200" },
  {
    title: "Instagram",
    icon: BrandInstagram,
    color: "magenta",
    bg: "bg-violet-200",
  },
  { title: "Linkedin", icon: BrandLinkedin, color: "blue", bg: "bg-blue-200" },
  { title: "Facebook", icon: BrandFacebook, color: "blue", bg: "bg-blue-200" },
  { title: "Youtube", icon: BrandYoutube, color: "red", bg: "bg-red-200" },
  {
    title: "Whatsapp",
    icon: BrandWhatsapp,
    color: "green",
    bg: "bg-green-200",
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    transition: "box-shadow 150ms ease, transform 100ms ease",
    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.09)",
    },
  },
}));

const Test: React.FC = () => {
  //   App card
  const [dynamicFields, setDynamicFields] = useState<
    Array<{
      count: number;
      title: string;
      key: number;
      value: string;
    }>
  >([]);

  // Create a state variable to track the number of times each field has been added
  const [fieldCounts, setFieldCounts] = useState<{ [key: string]: number }>({});
  //   limitation
  const addDynamicField = (title: string) => {
    // Check the count for the current field
    const count = fieldCounts[title] || 0;
    if (count < 2) {
      // Allow adding only up to 2 times
      const newKey = Date.now(); // Generate a unique key using the current timestamp
      setDynamicFields((prevFields) => [
        ...prevFields,
        { title: title, key: newKey, count: count - 1, value: "" },
      ]);
      // Update the count for the current field
      setFieldCounts((prevCounts) => ({
        ...prevCounts,
        [title]: count + 1,
      }));
    }
  };
  const removeDynamicField = (keyToRemove: number) => {
    // Filter out the field with the specified key
    setDynamicFields((prevFields) =>
      prevFields.filter((field) => field.key !== keyToRemove)
    );

    // Decrease the count for the removed field's title
    const removedField = dynamicFields.find(
      (field) => field.key === keyToRemove
    );
    if (removedField) {
      setFieldCounts((prevCounts) => ({
        ...prevCounts,
        [removedField.title]: (prevCounts[removedField.title] || 0) - 1,
      }));
    }
  };
  const handleDynamicFieldChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    const newValue = e.target.value;
    setDynamicFields((prevFields) =>
      prevFields.map((field) =>
        field.key === key ? { ...field, value: newValue } : field
      )
    );
  };

  const { classes } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className={`${classes.item} ${item.bg}`}
      onClick={() => addDynamicField(item.title)} // Call addDynamicField onClick
    >
      <div className="">
        <item.icon color={item.color} size="2rem" />
      </div>
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  return (
    <div className="space-x-5 p-5 lg:flex">
      <div className="lg:w-3/6">
        {/* Form */}
        <div>
          <Card className="p-5" withBorder radius="md">
            <div className="-my-2">
              <p className="text-3xl font-bold">Enter Your Card Details</p>
            </div>

            <Form>
              <Form.Item label="Cover Image URL">
                <Input
                  onChange={(e) => handleInputChange(e, setCoverImageUrl)}
                />
              </Form.Item>
              <Form.Item label="Logo URL">
                <Input onChange={(e) => handleInputChange(e, setLogoUrl)} />
              </Form.Item>
              <Form.Item label="Name">
                <Input onChange={(e) => handleInputChange(e, setName)} />
              </Form.Item>
              <Form.Item label="Title">
                <Input onChange={(e) => handleInputChange(e, setTitle)} />
              </Form.Item>
              <Form.Item label="Company">
                <Input onChange={(e) => handleInputChange(e, setCompany)} />
              </Form.Item>

              {/* Dynamic Form Fields */}
              {dynamicFields.map((field) => (
                <Form.Item
                  key={field.key}
                  label={`${field.title} ${field.count + 2}`}
                >
                  <div className="flex space-x-2">
                    <div>
                      <Input
                        onChange={(e) => handleDynamicFieldChange(e, field.key)}
                      />
                    </div>
                    <div
                      className="pt-1"
                      onClick={() => removeDynamicField(field.key)}
                    >
                      <IoIosRemoveCircleOutline />
                    </div>{" "}
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
      <div className="lg:w-2/6">
        {/* Card Selectors */}
        <div className="">
          <Card className="p-5" withBorder radius="md">
            <div className="-my-2">
              <p className="text-3xl font-bold">Add/remove fields</p>
            </div>
            <SimpleGrid cols={3} mt="md">
              {items}
            </SimpleGrid>
          </Card>
        </div>
      </div>
      <div className="lg:w-2/6">
        {/* Preview */}
        <div className="">
          <Card className="p-5" withBorder radius="md">
            {/* <div className="flex"> */}
            <div className="-my-2">
              <p className="text-3xl font-bold">Card Preview</p>
            </div>
            <div className="">
              <img src={coverImageUrl} className="w-full rounded-2xl" />
            </div>
            {/* </div> */}
            <div className="">
              <Divider className="bg-gray-300" />

              <Typography.Text className="text-2xl font-extrabold">
                {name}
              </Typography.Text>
              <Divider className="bg-gray-300" />
            </div>
            <div className="flex place-content-between items-center">
              <div className="pt-2">
                <div>
                  <Typography.Text className="text-xl font-bold">
                    {title}
                  </Typography.Text>
                </div>
                <div className="pt-2">
                  <Typography.Text className="text-lg font-semibold">
                    @ {company}
                  </Typography.Text>
                </div>
              </div>
              {logoUrl && (
                <div>
                  <img src={logoUrl} className="h-16 rounded-2xl" />
                </div>
              )}
            </div>

            <div>
              <Divider className="bg-gray-300" />

              {/* Display the value of the field */}
              {dynamicFields.map(
                (field) =>
                  field.value && (
                    <div>
                      <div
                        className="grid grid-cols-12 items-center justify-items-stretch"
                        key={field.key}
                      >
                        <div className="col-span-2">
                          {mockdata.map((item) =>
                            item.title === field.title ? (
                              <div
                                className={`${item.bg} flex flex-col items-center justify-center rounded-2xl p-3`}
                                key={field.key}
                              >
                                {item.icon({ size: "2rem", color: item.color })}
                              </div>
                            ) : null
                          )}
                        </div>
                        <div className="col-span-10 pl-4 ">
                          <div className="">
                            <Typography.Text className="text-sm font-bold">{`${
                              field.title
                            } ${field.count + 2}`}</Typography.Text>
                          </div>
                          <div className="">
                            <Typography.Text className="text-base font-normal">{`${field.value}`}</Typography.Text>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-300" />
                    </div>
                  )
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Test;
