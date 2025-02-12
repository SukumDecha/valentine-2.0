import Choose from "@/components/Choose/Choose";
import VinylService from "@/services/vinyl.service";


interface PageProps {
  params: {
    uuid: string
  }
}

const CameraPage = async ({ params }: PageProps) => {

  const userData = await VinylService.getUser(params.uuid);

  if (!userData.success) {
    return <Choose uuid={params.uuid} />
  }

  return (
    <>
      <p>Yes there is</p>
    </>
  );
};

export default CameraPage;