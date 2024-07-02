import BannerProfileComponent from "@/components/banner/banner.profile.component";
import FooterProfileComponent from "@/components/footer/footer.profile.component";
import HeaderProfileComponent from "@/components/header/header.profile.component";
import InfoProfileComponent from "@/components/info/info.profile";

export default function ProfilePage() {
  console.log('Rendered on client');
  
  return (
    <div>
      <HeaderProfileComponent />
      <BannerProfileComponent />
      <InfoProfileComponent />
      <FooterProfileComponent />
    </div>
  );
}
