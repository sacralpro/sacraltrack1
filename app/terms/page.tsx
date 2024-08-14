"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";
import { BsChevronLeft } from "react-icons/bs";
import TopNav from "@/app/layouts/includes/TopNav";


export default function TermsOfUse() {
  const router = useRouter();
  const { setIsLoginOpen } = useGeneralStore();
  const user = useUser();
  const userContext = useUser();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
             <TopNav params={{ id: userContext?.user?.id as string }} />
             <div className="flex flex-col items-center justify-center min-h-screen h-full bg-[#15161A] text-white pt-[100px]">
      <div className="w-full max-w-[800px] p-6 bg-[#1A2338] rounded-2xl shadow-lg">
  
        <div className="flex items-center justify-between mb-6">
        {/*  <button
            className="flex items-center text-[#20DDBB] hover:text-[#21C3A6] cursor-pointer"
            onClick={handleGoBack}
          >
            <BsChevronLeft size={20} className="mr-2" />
            Back
          </button>
          {user ? (
            <div className="flex items-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{user.name}</span>
            </div>
          ) : (
            <button
              className="bg-[#3E83F7] text-white px-4 py-2 rounded-lg hover:bg-[#2E6FD8]"
              onClick={() => setIsLoginOpen(true)}
            >
              Log in
            </button>
          )} */}
        </div>
        <h1 className="text-2xl font-bold mb-4">Terms of Use</h1>
        <div className="text-[#CCCCCC] text-[14px] leading-6">
          <p className="mb-4">
 

          Welcome to sacraltrack.com (hereinafter referred to as the “Site").
          The Site, all services and APIs are the property of Sacral Projects (hereinafter referred to as the "Company"), which is registered under Partnership No. OC436704
          at the following address: Palliser House Second Floor - London, United Kingdom - Sacral Projects LLP. The registration number, all existing and future services, software and data accessed through the Sacral Track web application, including Sacral Track widgets and Sacral Track API (hereinafter referred to as the "Services"), are collectively referred to in these Terms of Use and agreements as "ST Systems".
          Sacral Projects LLP provides access to Sacral Track web application at www.sacraltrack.store, sacraltrack.com and its associated URL addresses (hereinafter referred to as the "Web App").
          Sacral Projects LLP
          United Kingdom, London
          Palliser House Second Floor
          Partnership No. OC436704

          </p>
          <h2 className="text-xl font-bold mb-2">Introduction.
          </h2>
          <p className="mb-4">
          Sacral Track is an interactive Web App (social media), a music store for Artists and Music Lovers. This Web App enables you to:

          When registering as Artist: 
          - Upload your tracks to the Service and put them up for sale;
          - Establish a price for your tracks;
          - Familiarize yourself with sales statistics; 
          - Interact with other users through private messages and comments; (Beta version)
          - Create Events; (Beta version)
          - Create Playlists; (Beta version)
          - Create Purchase Plans (Carts) and buy tracks from other Artists; 
          - Upload photos, videos and audio messages. (Beta version)

          When registering as Music Lover:
          - Purchase your favourite music;
          - Listen to music on the Service without restrictions (320 kbps);
          - Interact with other users through private messages and comments; (Beta version)
          - Create Events; (Beta version)
          - Create Playlists; (Beta version)
          - Create Purchase Plans (Carts) and buy tracks from other Artists; 
          - Add Artists and other users to friends (accordingly, monitor their updates). (Beta version)

          Please read these Terms of Use (hereinafter referred to as the "Agreement") carefully before using the Services offered by Sacral Track. 
          This Agreement sets forth the legally binding terms and conditions for your use of the Site at https://sacraltrack.store, https://sacraltrack.com (hereinafter referred to as the "Site") and the Services owned and operated by the Company, including any mobile software applications offered or published by the Company. By using ST Systems in whatever form and by whatever medium, you agree to be bound by these Terms of Use. These Terms of Use apply to all users of ST Systems, including users, who are the authors of the content (Artists), information and other materials or services incorporated in ST Systems).


          </p>
          <h2 className="text-xl font-bold mb-2">Acceptance of the Terms of Use.
          </h2>
          <p className="mb-4">
          The right to use ST Systems is granted subject to acceptance, without modification, of all terms and conditions contained in this document (hereinafter referred to as the "Terms of Use"), which also include the Privacy Policy available at http://sacraltrack.store/terms the Copyright Policy available at http://sacraltrack.store/terms, as well as all other rules, policies and amendments that may be published from time to time on the Site by the Company, each of which is incorporated in these Terms of Use by reference. The Company may update it from time to time without any advance notice whatsoever. In addition, some of the services offered by ST Systems may be subject to additional terms and conditions published periodically by the Company; your usage of such services is governed by those additional terms that are incorporated in these Terms of Use through this link (https://sacraltrack.store/terms). 

          </p>
          <h2 className="text-xl font-bold mb-2">Intellectual Property Right and License in Relation to the Company.</h2>
          <p className="mb-4">
          Copyright for the design, database and any other intellectual property, including the Content (computer programs, source and object codes, documentation, software graphics, texts, images, drawings, videos, animations, databases, logos, domain names, trade names, audio tracks) and other existing or future rights related to ST Systems are the property of Sacral Projects, its subsidiaries and Sacral Track project (ST Systems), as well as its affiliates and/or licensors.
          No Content may be copied (reproduced), processed, distributed, displayed in frame, published, downloaded, transferred, sold or otherwise used in whole or in part without the prior written permission of ST Systems or other intellectual property owner indicated on the Site.

          Subject to strict observance of these terms and conditions, ST Systems provides you with the opportunity to purchase, listen and publicly perform tracks purchased on Sacral Track, as well as to use all functional capabilities of ST Systems. It is prohibited to sell tracks purchased on Sacral Track through any third-party resources or to publish these tracks on other labels that do not have partnership agreements with Sacral Track.
          The use of tracks in videos and any advertising products is possible only with the consent of the Sacral Track licensor. 
          In order to do that, you can send a written request to the following address: sacraltrack@gmail.com.

                    </p>
                    <h2 className="text-xl font-bold mb-2">Terms of Use and Acceptance of the Terms of Use.
                    </h2>
                    <p className="mb-4">
                    ST Systems provides you with its services (hereinafter referred to as the "Service") in accordance with the Terms of Use set forth below:

          1. The users are obliged to fully familiarize themselves with these Terms of Use before registering on the Site.
          3. By obtaining access to the use of ST Systems, which also includes accepting, sending or downloading any information or Content from or to the Web App, you agree to abide by these Terms and Conditions.
          4. By registering an account and publishing information on ST Systems, you automatically agree to our Terms and Conditions.
          5. Modification of the Terms of Use:
          The Company reserves the right to modify or replace any of the conditions of these Terms of Use, as well as to modify, suspend or terminate the Service (including, without limitation, the availability of any functions, database or content) at its sole discretion at any time, by posting a notice on the Site or by sending you an email. The Company is also entitled to impose restrictions on certain functions and services or restrict your access to any part or all of the Services without any notification or liability. It is your responsibility to periodically check these Terms of Use for possible modifications. By continuing to use the Service after the publication of any modifications to these Terms of Use, you agree to these modifications. No modifications to these Terms of Use shall apply to any disputes between you and the Company that arose prior to the date of such modifications.

                    </p>
                    <h2 className="text-xl font-bold mb-2">Registration.
                    </h2>
                    <p className="mb-4">
                    1. In order to get access to all functional capabilities of ST Systems (Sacral Track), you should create an account (get registered). User registration in ST Systems is free and voluntary and is performed at the sms veryfication with form e-mail and user name.
          2. By registering, you agree that the information that you provide to ST Systems during registration and at any other time will be complete and accurate, you also guarantee its veracity and relevance.
          3. When registering a User Account (Artist/Music Lover), you will be prompted to enter a username and password. The username and password you have chosen constitute the necessary and sufficient information for obtaining access to ST Systems. The User does not have the right to transfer his username and password to any third parties and is fully responsible for their security. Should you have any reason to believe that your account is no longer secure, immediately inform Sacral Track of this at the following address: sacraltrack@gmail.cm.
          5. By registering, you agree to the processing of your personal data in order to provide you with access to the functional capabilities of the Site. ST Systems takes all necessary measures to protect your personal data from unauthorized access, modification, loss, accidental or illegal destruction. We provide access to personal data only to those ST Systems employees and service providers, who need this information in order to ensure the functioning of the Site and to provide the User with an opportunity to use it.
          ST Systems is entitled to use the information provided by the User, including personal data, as well as transfer it to any third parties without his consent in cases where it is necessary for:
          - ensuring compliance with applicable laws (USA);
          - protection of the rights and interests of users, website administration, affected third parties, including the identification, verification/investigation and/or suppression of illegal actions. Disclosure of information provided by the User can be performed only within the framework of applicable laws United Kingdom (at the request of the court, law enforcement agencies).
          The full version of Privacy Policy is available at the following address:
          https://sacratrack.store/terms


                    </p>
                    <h2 className="text-xl font-bold mb-2">Copyright in Relation to Users Registered as Artists.
                    </h2>
          <p className="mb-4">

          You represent and warrant that to the extent that you are the author of tracks contained in your Artist accounts, in whole or in part (for example, in the capacity of a co-author), you have full right and authority to grant the rights set forth in these Terms of Use, irrespective of the terms and conditions of any agreements that you may have entered into with any performance rights organisation (hereinafter referred to as "PRO"), whether it is located in the United Kingdom (such as ASCAP, BMI or SESAC) or elsewhere, or any music publisher, and that you are solely responsible for taking all measures necessary to inform such a PRO or music publisher that you have granted a free license to the Service for public reproduction and transfer to the public of your track, and that no fees or charges should be paid to any PRO or music publisher for public performance of publication of your tracks on ST Systems.
          You represent and warrant that no fees of any kind are owed to any third party, including, but not limited to, any label, trade union, guild, vocalist or musician, engineer or producer, for the use or re-use of your Music in accordance with these Terms of Use.

          By clicking on the "Upload Track" button, the Artist agrees that he is the author of the track and that he possesses the source version of the track, which confirm this fact. 
          In case you are uploading a third party track under your name, you take full responsibility for the consequences of such action. ST Systems is not responsible for your actions.

          In order to authorize the Company to use your Music in accordance with the above provisions, you provide the Company with a worldwide, non-exclusive, gratuitous, transferable and non-transferable right to use, distribute, reproduce, copy and display trademarks, service marks, slogans, logos or similar property rights (collectively referred to as "Trademarks") solely in connection with the Service or in the field of marketing, promotion or advertising of the Service, including in all forms of marketing, as well as existing and future advertising materials.
          By uploading Music/Cover, you represent and warrant that the use of your Music and/or Cover by ST Systems and its authorized sub-licensees and distributors and/or users of Sacral Track, as provided for in these Terms of Use, will not violate any rights of any third parties, including but not limited to any privacy rights, publicity rights, copyrights, contractual rights or any other intellectual property or property rights.

          You bear responsibility for indemnification and protection of the Company against any claims related to the use of your Music on the Service, including all legal expenses.

          Once the A&R Manager accepts the track you have uploaded to the Store, ST Systems automatically becomes the copyright holder of the track. The Artist, in turn, receives a fee in the amount of 50% of the cost of each download of this track.
          This does not apply to the circumstances where the Artist publishes a third party track under his name.

          </p>
          <h2 className="text-xl font-bold mb-2">Publication Terms and Conditions:
          </h2>
          <p className="mb-4">
          An A&R Manager is a person, who approves tracks uploaded to the Store for publication on Sacral Track. Treat your creative output and our managers with respect. Before uploading a track to the Store, make sure that it is fully completed and meets all the requirements.

          Track/Music
          Allowed for publication are the tracks that meet the following requirements:
          - the track is your work of authorship and you possess the source version of the track;
          - the track went through the mastering stage and is fully completed in your opinion;
          - the track corresponds to the quality of WAV 44100hz, 16 bit, WAV 44100hz, 24 bit;
          - track duration ranges from 3 to 12 minutes;
          - the track has not been signed to a label and has not been released anywhere before (not encumbered with obligations to any third parties).
          An exception to the above is when the label (third parties) provides for track publication on other resources with the transfer of full copyright to such resources. 
          In the event that you violate this condition, ST Systems renounces all liability whatsoever.

          *Free listening of tracks in the store available in 192kbps;

          Cover(Artwork).
          Allowed for publication are the Covers that meet the following requirements:
          - Allowed sizes are 1200x1200px 150dpi. Artwork format: jpg, png, mp4 optimized for web;
          Should these dimensions be exceeded, the Cover will be automatically reduced.
          - There are no authors/third parties, whose copyright/related rights will be violated as a result of publication and/or use of their content on the Service.
          In the event that you violate this condition, ST Systems renounces all liability whatsoever.

          </p>
          <h2 className="text-xl font-bold mb-2">Publication Period:
          </h2>
          <p className="mb-4">
          Subject to the terms of this Agreement, the mandatory publication period of your track on the Site amounts to 4 years. After 4 years have passed, a notification letter will be sent to your e-mail about the expiration of this period, and you can either remove the track from publication or leave it in the Store.

          Once the track has been uploaded and approved by the A&R Manager, the author will be unable to remove the track from ST Systems. The artist has the opportunity to request the Sacral Track team through the Team Support function and ask to remove the track from publication in the Store. This is only possible in cases of copyright infringement.

          The policy needs to be further developed in relation to the possibility/impossibility of deletion of material by the Author..
          </p>
          <h2 className="text-xl font-bold mb-2">Royalty Agreement
          </h2>
          <p className="mb-4">
          By submitting a track to the Store, you agree to the royalty terms established by ST Systems.
          The royalty for a published track amounts to 50% of track price established by the Artist, which implies the cost of each download of such track.
          ST Systems reserves the right to change the royalty percentage at its discretion and at any time with the written notification of the Artist. 

          The Artist is entitled to establish the cost of the track within the limits determined by ST Systems. 
          ST Systems is entitled to change the limits for the cost of tracks. 
          ST Systems is entitled to change the cost of the Content established by the User and to assign discounts on Content through the use of promotional codes/promotional offers. In the event that the cost of the track is changed by the A&R Manager, the Artist will be notified by a message and an e-mail.

          Sacral Track may redistribute previously purchased copies of your products at the sole discretion of the Company to users, who received a damaged copy of your product, a version of your product with an incorrect file format, an incomplete copy of your product, or suffered the loss of your product due to a hard disk failure, damage, theft or destruction at no cost to the User (i.e., the user will not be charged a new redistribution fee). 
          Such a redistribution can be performed by providing the User with the opportunity to independently upload a replacement copy. In the event of any of the above redistributions, no additional payments will be made to you for such redistributions.

          </p>
          <h2>Payment Agreement
          </h2>
          <p>ST Systems has partnerships with Stripe and other payment services and infrostructures. All money transactions made on the Site (https://sacraltrack.store, https://sacraltrack.com) are performed using the above services.
          By accepting the terms and conditions of these Terms of Use, you automatically agree to the terms and conditions of Stripe and other payment services and infrostructures. ST Systems is not responsible for the safety of your funds.
          ST Systems, for its part, ensures the confidentiality of your personal data.

          </p>
          <h1>Marketing Terms.
          </h1>
          <p>
          In order to authorize the Company to use your Music in accordance with the above provisions, you grant the Company with a worldwide, non-exclusive, gratuitous, transferable and non-transferable right to use, distribute, reproduce, copy and display trademarks, service marks, slogans, logos or similar property rights (collectively referred to as "Trademarks") solely in connection with the functional capabilities of ST Systems or in the field of marketing, promotion or advertising of the Service, including in all forms of marketing, as well as existing and future advertising materials.

          ST Systems conducts large-scale advertising campaigns to further develop Sacral Track and to attract more users and artists. By accepting these terms, you agree that the personal information you publish on www.sacraltrack.com (tracks, biography, comments, reviews and more) can be used in any of the following marketing components and companies:
          - Social media marketing;
          - PR companies;
          - Media productions (audio, video);
          - Events;
          - Brand-book;
          - Merchandise

          </p>

          <h1>Purchased Content, which is Subject to Removal.
          </h1>
          <p>
          We cannot guarantee that the Content you purchased on ST Systems will be available to you for an unlimited period of time.
          For example, if we receive a notice of an alleged copyright infringement from the copyright holder or his agent in relation to a specific Content, then US laws may require us to remove this Content from ST Systems and not make it available for future sale, and we may also refuse permanent access to anyone, who has previously purchased such Content.
          This means that you may no longer be able to access the Content you purchased, which was previously available to you through ST Systems.

          In the event that we are required by law to prohibit access through ST Systems to previously purchased Content, including by removing access to Content from the user's personal collection through any mobile application, then the Company and the Contractors will not indemnify the user, who purchased this Content, except as otherwise provided by applicable law. 
          The users bear all the risks associated with the denial of access to any Content purchased through ST Systems.
          Since it is possible that we may deny your access to previously purchased Content, we recommend that you immediately download any Content purchased by you through ST Systems to your own devices, so that you retain control and ownership of such Content, even if we are required to remove such Content from ST Systems.

          </p>

          <h1>
          Third-party Sites.
          </h1>
          <p>
          Our Service may allow you to include links to other websites or resources on the Internet, and other websites or resources may contain links to the Site. When you choose to access any third-party websites, you do so at your own risk. These other websites are not under the control of ST Systems, and you acknowledge that ST Systems is not responsible for the content, function, accuracy, legitimacy, relevance or any other aspects of such websites or resources. The inclusion of any such link does not imply approval by ST Systems or any association with their operators. You also acknowledge and agree that ST Systems is not liable, directly or indirectly, for any damage or loss caused or presumably caused by or in connection with the use or reliance on any such Content, goods or services available on or through any of such websites or resources.

          </p>


<div className="flex justify-end">
  <button
    className="bg-[#20DDBB] text-white px-4 py-2 rounded-lg hover:bg-[#21C3A6]"
    onClick={handleGoBack}
  >
    Close
  </button>
</div>
</div>
</div>
</div>
</>
);
}
