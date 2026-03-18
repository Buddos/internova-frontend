import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Lock, Eye, Palette, LogOut, Mail, Save } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  if (!user) {
    return (
      <>
        <AppHeader title="Settings" />
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <Card className="w-full max-w-md p-6 text-center">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Sign In Required</h2>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">You need to be logged in to access settings.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => navigate("/login")} className="flex-1 text-xs sm:text-sm">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/register")} className="flex-1 text-xs sm:text-sm">
                  Register
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader title="Settings" />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card px-4 sm:px-6 py-4 sm:py-6">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Account Settings</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Manage your preferences and account security</p>
        </div>

        <div className="max-w-4xl p-4 sm:p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
              <TabsTrigger value="general" className="text-xs sm:text-sm">General</TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
              <TabsTrigger value="privacy" className="text-xs sm:text-sm">Privacy</TabsTrigger>
              <TabsTrigger value="account" className="text-xs sm:text-sm">Account</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-6 mt-6">
              <Card className="p-4 sm:p-6">
                <h3 className="flex items-center gap-2 font-heading text-base sm:text-lg font-semibold">
                  <Palette size={18} />
                  Display Settings
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="text-xs sm:text-sm font-medium">Dark Mode</Label>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-xs sm:text-sm">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme" className="text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-lg font-semibold">Language & Region</h3>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                        <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                  <Bell size={20} />
                  Notification Preferences
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="font-medium text-foreground">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="font-medium text-foreground">Email Updates</p>
                      <p className="text-sm text-muted-foreground">Subscribe to weekly updates and tips</p>
                    </div>
                    <Switch
                      checked={emailUpdates}
                      onCheckedChange={setEmailUpdates}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                  <Mail size={20} />
                  Email Preferences
                </h3>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    New opportunity notifications
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    Application status updates
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    Marketing announcements
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    Company updates
                  </label>
                </div>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                  <Eye size={20} />
                  Profile Visibility
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Who can see your profile?</Label>
                    <Select defaultValue="private">
                      <SelectTrigger id="visibility">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private (Only Me)</SelectItem>
                        <SelectItem value="connections">Connections Only</SelectItem>
                        <SelectItem value="companies">Companies Only</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="searchable">Allow profile in search</Label>
                    <Select defaultValue="yes">
                      <SelectTrigger id="searchable">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                  <Lock size={20} />
                  Data & Privacy
                </h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>• Your data is encrypted and stored securely</p>
                  <p>• We never share your personal information with third parties</p>
                  <p>• You can download your data anytime</p>
                  <p>• You can delete your account and all associated data</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">Download My Data</Button>
                  <Button variant="outline" className="text-destructive">Delete Account</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card className="p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                  <Lock size={20} />
                  Change Password
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-lg font-semibold">Two-Factor Authentication</h3>
                <p className="mt-2 text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                <div className="mt-4">
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-lg font-semibold">Active Sessions</h3>
                <p className="mt-2 text-sm text-muted-foreground">Manage your active sessions across devices</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium">Chrome on Windows</p>
                      <p className="text-xs text-muted-foreground">Last active: Just now</p>
                    </div>
                    <span className="text-xs text-green-600 font-medium">Current</span>
                  </div>
                </div>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5 p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-destructive">
                  <LogOut size={20} />
                  Sign Out
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">Sign out from all devices or just this device</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">Sign Out This Device</Button>
                  <Button variant="destructive">Sign Out All Devices</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave} className="gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}