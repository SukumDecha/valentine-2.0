'use client'

import { useEffect, useState } from "react";
import Choose from "@/components/Choose/Choose";
import VinylService from "@/services/vinyl.service";
import { IUserResponse } from "@/types/vinyl/vinyl";
import Vinyl from "@/components/VinylLayout";
import NotFound from "../not-found";
import Loading from "../loading";

interface IProps {
  params: {
    uuid: string;
  };
}

const CameraPage = ({ params }: IProps) => {
  const [userData, setUserData] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await VinylService.getUser(params.uuid);
        setUserData(data);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.uuid]);

  if (loading) {
    return <Loading />
  }

  if (!userData?.success || error) {
    return <NotFound />
  }

  if (!userData.images || userData.images.length === 0 || !userData.template) {
    return <Choose uuid={params.uuid} />;
  }

  return (
    <Vinyl template={userData.template} data={userData} />
  );
};

export default CameraPage;
