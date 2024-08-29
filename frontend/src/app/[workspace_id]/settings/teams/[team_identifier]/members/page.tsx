'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CircleAlert, Search, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addTeamMembers, getTeamMembers } from '@/services/Teams/teamsService';
import { useParams } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ILabelForm {
  email: string;
  handleCancel: () => void;

  setEmail: (label: string) => void;
  handleSave: () => void;
}

const LabelForm = ({
  handleCancel,
  setEmail,
  email,
  handleSave,
}: ILabelForm) => {
  return (
    <div className="rounded-sm border bg-accent p-1.5 pl-3 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <Input
          className="h-8"
          placeholder="Member email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Separator orientation="vertical" className="h-8" />
        <Button
          className="h-8 dark:bg-accent dark:hover:bg-accent/60"
          variant="outline"
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button className="h-8" onClick={() => handleSave()}>
          Save
        </Button>
      </div>
    </div>
  );
};

function alreadyExist() {
  toast({
    icon: <CircleAlert className="size-5" />,
    title: 'Unable to add member',
    description: (
      <p className="text-gray-500 dark:text-white/70">
        A member with this email already exists in the team members.
      </p>
    ),
  });
}

const MembersPage = () => {
  const params = useParams();
  const [search, setSearch] = useState<string>();
  const [addMember, setAddMember] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const teams = useSelector((state: RootState) => state.teams.teams) ?? null;
  const [email, setEmail] = useState<string>('');
  const memberAlreadyInTeam = teamMembers.some((item) => item.email === email);

  const team = teams?.find(
    (item) => item.identifier === params.team_identifier,
  );

  const getMembers = async () => {
    await getTeamMembers(team?.id ?? '').then((res) => setTeamMembers(res));
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleCancelNewMember = () => {
    setAddMember(false);
    setEmail('');
  };

  const handleCreateNewLabel = async () => {
    memberAlreadyInTeam
      ? alreadyExist()
      : await addTeamMembers(team?.id ?? '', {
          email,
        })
          .then(() => {
            getMembers();
            handleCancelNewMember();
          })
          .catch((error) =>
            toast({
              icon: <CircleAlert className="size-5" />,
              title: error.message,
              variant: 'destructive',
            }),
          );
  };

  return (
    <div className="lg:mt-18 m-4 mx-auto w-[21rem] sm:mt-12 sm:w-[35rem] lg:w-[40rem]">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="text-3xl font-normal">Team Members</div>
          <div className="text-sm text-black/50 dark:text-white/70">
            Manage who is a member of the{' '}
            <span className="font-semibold text-black/70">{`${team?.name}`}</span>{' '}
            team
          </div>
          <Separator />
        </div>
        <div className="flex justify-between">
          <div className="relative w-56">
            <Search
              className="absolute left-2.5 top-1 text-gray-400"
              width={16}
            />
            <Input
              className="h-8 pl-8"
              placeholder="Filter by name"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <Button
            className="h-8"
            onClick={() => setAddMember(true)}
            disabled={addMember}
          >
            Add Member
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold">{`${teamMembers.length} ${teamMembers.length > 1 ? 'members' : 'member'}`}</p>
          {addMember && (
            <LabelForm
              email={email}
              setEmail={setEmail}
              handleCancel={handleCancelNewMember}
              handleSave={handleCreateNewLabel}
            />
          )}
          {teamMembers
            .filter((filter) =>
              search
                ? filter.email.toLowerCase().includes(search.toLowerCase()) ||
                  filter.full_name.toLowerCase().includes(search.toLowerCase())
                : filter.email,
            )
            .map((user) => {
              return (
                <div key={user.id} className="space-y-2">
                  <div className="group flex flex-col bg-white/5 p-1 pr-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="size-10">
                          {user.image ? (
                            <Avatar>
                              <AvatarImage
                                src={user.image as string}
                                alt="Profile"
                                className="flex size-full rounded-full object-cover"
                              />
                            </Avatar>
                          ) : (
                            <div className="flex size-10 items-center justify-center rounded-full border-2 border-dashed p-0.5 text-xs dark:border-background">
                              {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {user.full_name}
                          </p>
                          <p className="text-sm">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {teamMembers.length > 1 && (
                          <Trash
                            width={16}
                            className="cursor-pointer text-gray-500"
                            onClick={() => {
                              console.log('oi');
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
