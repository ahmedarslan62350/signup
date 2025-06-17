"use client";

import { useState, useEffect } from "react";
import { FileText, Eye, Search, Users, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { toast } from "sonner";
import { IRegisterSchema } from "@/models/register";
import Link from "next/link";

interface FileData {
  path: string;
  filename: string;
  size: number;
}

interface UserData extends IRegisterSchema {
  createdAt: Date;
}

export default function AdminPanel() {
  // Main tabs state
  const [activeTab, setActiveTab] = useState("users");
  // Users state
  const [users, setUsers] = useState<UserData[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Loading states
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    // Fetch users data
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/v1/get-users", {
          withCredentials: true,
        });

        if (!data.success) {
          toast.error("Unauthorized");
        }

        toast.success("Users founded");
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    // Fetch files data
    fetchUsers();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // const getFileTypeIcon = (type: string) => {
  //   if (type.startsWith("image/")) return "🖼️";
  //   if (type.startsWith("text/")) return "📄";
  //   if (type.startsWith("application/pdf")) return "📑";
  //   if (type.includes("document")) return "📝";
  //   if (type.includes("spreadsheet")) return "📊";
  //   if (type.includes("json")) return "🔧";
  //   return "📁";
  // };

  const getBusinessTypeLabel = (type: string) => {
    switch (type) {
      case "contact_center":
        return "Contact Center";
      case "reseller":
        return "Reseller";
      case "wholesale":
        return "Wholesale";
      default:
        return type;
    }
  };

  const handleViewUser = (user: UserData) => {
    setSelectedUser(user);
  };

  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };

  const handleSaveFile = async () => {
    try {
      // In a real app, you would save the edited content to your API
      // await axios.put(`/api/admin/files/${selectedFile?.id}/content`, {
      //   content: editedContent
      // });

      setIsEditorOpen(false);

      // Show success message
      toast("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
      toast("Error saving file");
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.companyName
            .toLowerCase()
            .includes(userSearchTerm.toLowerCase()) ||
          user.firstName.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
          user.contactEmail.toLowerCase().includes(userSearchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription className="text-gray-100">
            Manage users, view files, and edit content
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs
            defaultValue="users"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-1 mb-8">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users size={16} />
                <span>Registered Users</span>
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-1/3">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    placeholder="Search users or companies..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    Total Users: {users?.length}
                  </Badge>
                </div>
              </div>

              {loadingUsers ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Contact Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Business Type</TableHead>
                        <TableHead>Business Address</TableHead>
                        <TableHead>Business country</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers?.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-gray-500"
                          >
                            No users found matching your search
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers?.map((user) => (
                          <TableRow
                            key={JSON.stringify(user._id)}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">
                              {user.companyName}
                            </TableCell>
                            <TableCell>
                              {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell>{user.contactEmail}</TableCell>
                            <TableCell>
                              {getBusinessTypeLabel(user.businessType)}
                            </TableCell>
                            <TableCell>
                              {getBusinessTypeLabel(user.physicalAddress)}
                            </TableCell>
                            <TableCell>
                              {getBusinessTypeLabel(user.bussinessCountry)}
                            </TableCell>
                            <TableCell>
                              {formatDate(
                                new Date(user?.createdAt).toDateString()
                              )}
                            </TableCell>
                            <TableCell>
                              {getBusinessTypeLabel(user.website)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewUser(user)}
                                title="View user details"
                              >
                                <Eye size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* File Viewer Dialog */}
      <Dialog
        open={selectedFile !== null}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setSelectedFile(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="text-purple-600" size={20} />
              Front Side
            </DialogTitle>
            <DialogDescription>
              Uploaded by {selectedUser?.firstName} on{" "}
              {selectedFile &&
                formatDate(
                  new Date(selectedUser?.createdAt as Date).toDateString()
                )}
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="preview"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center border-b">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="details">File Details</TabsTrigger>
              </TabsList>

              <div className="flex gap-2 p-2">
                {isEditorOpen ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveFile}
                    className="flex items-center gap-1"
                  >
                    <Save size={16} />
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenEditor}
                    className="flex items-center gap-1"
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                )}
              </div>
            </div>

            <TabsContent
              value="details"
              className="flex-1 overflow-auto p-4 mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      File Name
                    </h3>
                    <p>filename</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Upload Date
                    </h3>
                    <p>
                      {selectedFile &&
                        formatDate(
                          new Date(
                            selectedUser?.createdAt as Date
                          ).toDateString()
                        )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Company
                    </h3>
                    <p>filename</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      User ID
                    </h3>
                    <p>{selectedUser?.fileUrl}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog
        open={selectedUser !== null}
        onOpenChange={(open: boolean) => !open && setSelectedUser(null)}
      >
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="text-purple-600" size={20} />
              {selectedUser?.companyName}
            </DialogTitle>
            <DialogDescription>
              Registered on{" "}
              {selectedUser &&
                formatDate(new Date(selectedUser.createdAt).toDateString())}
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="details"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList>
              <TabsTrigger value="details">User Details</TabsTrigger>
              <TabsTrigger value="files">User File</TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="flex-1 overflow-auto p-4 mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">
                      Company Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Company Name
                        </h4>
                        <p className="text-base">{selectedUser?.companyName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Business Type
                        </h4>
                        <p className="text-base">
                          {selectedUser &&
                            getBusinessTypeLabel(selectedUser.businessType)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          National Id Card Number
                        </h4>
                        <p className="text-base">
                          {selectedUser && selectedUser.nationalId}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Registration Date
                        </h4>
                        <p className="text-base">
                          {selectedUser &&
                            formatDate(
                              new Date(selectedUser.createdAt).toDateString()
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Contact Name
                        </h4>
                        <p className="text-base">
                          {selectedUser?.firstName} {selectedUser?.lastName}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Email
                        </h4>
                        <p className="text-base">
                          {selectedUser?.contactEmail}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Phone
                        </h4>
                        <p className="text-base">
                          {selectedUser?.contactPhone}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Country of Residence
                        </h4>
                        <p className="text-base">{selectedUser?.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedUser?.businessType === "contact_center" && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">
                    Contact Center Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Number of Agents
                      </h4>
                      <p className="text-base">{selectedUser.agentsNumber}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Campaign
                      </h4>
                      <p className="text-base">{selectedUser.campaign}</p>
                    </div>
                  </div>
                </div>
              )}

              {(selectedUser?.businessType === "reseller" ||
                selectedUser?.businessType === "wholesale") && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">
                    Reseller Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Number of Ports
                      </h4>
                      <p className="text-base">500</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        IP Address
                      </h4>
                      <p className="text-base">192.168.1.100</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Campaign
                      </h4>
                      <p className="text-base">Enterprise Solutions</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  Additional Information
                </h3>
                <p className="text-base text-gray-700">
                  {selectedUser?.companyName} has been a registered user since{" "}
                  {selectedUser &&
                    new Date(selectedUser.createdAt).toLocaleDateString()}
                  .
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="files"
              className="flex-1 overflow-auto p-4 mt-4"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>filePath</TableHead>
                      <TableHead>Upload Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      key={selectedUser?.fileUrl}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">file</TableCell>
                      <TableCell className="font-medium">
                        <Link
                          className="truncate w-[200px]"
                          href={
                            selectedUser?.fileUrl ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZjYKPjVrCS_uKmuUXIkYNXPA3x0q_Y-hYQ&s"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedUser?.fileUrl || "None"}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {selectedUser &&
                          formatDate(
                            new Date(
                              selectedUser.createdAt as Date
                            ).toDateString()
                          )}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      key={selectedUser?.frontSideUrl}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {selectedUser && "FrontSide"}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link
                          className="truncate w-[500px] text-ellipsis overflow-hidden whitespace-nowrap"
                          href={
                            selectedUser?.frontSideUrl ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZjYKPjVrCS_uKmuUXIkYNXPA3x0q_Y-hYQ&s"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedUser?.frontSideUrl || "None"}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {selectedUser &&
                          formatDate(
                            new Date(
                              selectedUser.createdAt as Date
                            ).toDateString()
                          )}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={selectedUser?.backSideUrl}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {selectedUser && "BackSide"}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link
                          href={
                            selectedUser?.backSideUrl ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZjYKPjVrCS_uKmuUXIkYNXPA3x0q_Y-hYQ&s"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedUser?.backSideUrl || "None"}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {selectedUser &&
                          formatDate(
                            new Date(
                              selectedUser.createdAt as Date
                            ).toDateString()
                          )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
