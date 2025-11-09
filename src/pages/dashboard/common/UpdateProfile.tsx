/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/pages/ProfileUpdate.tsx
import { useEffect, useState } from "react";
import {
  useUpdateProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";

const ProfileUpdate = () => {
  const { data: userData, isLoading: userLoading } =
    useUserInfoQuery(undefined);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  console.log(userData);

  // const [name, setName] = useState(userData?.data?.user?.name || "");
  const [name, setName] = useState("");
  useEffect(() => {
    if (userData?.data?.user?.name) setName(userData.data.user.name);
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (userLoading)
    return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <>
      <div className="flex justify-center text-2xl mb-4 mt-10 font-bold items-center">
        <DecryptedText
          className="text-2xl mx-auto mb-4 text-center font-bold"
          text="Add Money"
          animateOn="view"
          speed={150}
          revealDirection="center"
        />
      </div>
      <div className="mx-auto flex flex-col md:flex-row gap-6">
        {/* Update Form */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="flex flex-col">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  className="mt-2"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>

              <Button type="submit" className="mt-2" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Display User Info */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Current Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-lg font-medium">{userData?.data?.user?.name}</p>
            <p className="text-sm text-muted-foreground">
              User ID: {userData?.data?.user?.id}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileUpdate;
