'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
      <h3 className="text-base font-bold text-stone-800 mb-4 text-center">Share This Property</h3>
      <div className="flex gap-3 justify-center">
        <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}>
          <FacebookIcon size={38} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}>
          <TwitterIcon size={38} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={property.name} separator=":: ">
          <WhatsappIcon size={38} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property listing: ${shareUrl}`}>
          <EmailIcon size={38} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
