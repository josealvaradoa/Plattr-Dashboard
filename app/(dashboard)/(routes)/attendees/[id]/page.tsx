import { getAttendeeByIdAction } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, Phone, Building2, Briefcase, LucideIcon } from "lucide-react";

interface AttendeePageProps {
  params: {
    id: string;
  };
}

const AttendeeInfoItem = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: LucideIcon;
  label: string;
  value?: string | null;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
};

const AttendeePage = async ({ params }: AttendeePageProps) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { attendee, error } = await getAttendeeByIdAction(params.id);

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!attendee) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Attendee not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Attendee Details</h1>
          <p className="text-muted-foreground">View and manage attendee information</p>
        </div>
        <Link href="/attendees">
          <Button variant="outline">Back to Attendees</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <h3 className="text-xl font-semibold">
                {attendee.first_name} {attendee.last_name}
              </h3>
              {attendee.status && (
                <Badge variant={attendee.status === 'active' ? 'default' : 'secondary'}>
                  {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                </Badge>
              )}
            </div>
            
            <div className="space-y-4">
              <AttendeeInfoItem 
                icon={Mail} 
                label="Email" 
                value={attendee.email} 
              />
              <AttendeeInfoItem 
                icon={Phone} 
                label="Phone" 
                value={attendee.phone} 
              />
              <AttendeeInfoItem 
                icon={Building2} 
                label="Company" 
                value={attendee.company} 
              />
              <AttendeeInfoItem 
                icon={Briefcase} 
                label="Position" 
                value={attendee.position} 
              />
              <AttendeeInfoItem 
                icon={CalendarDays} 
                label="Joined" 
                value={new Date(attendee.created_at).toLocaleDateString()} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity & Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-3 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Additional attendee information and activity will be displayed here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendeePage; 