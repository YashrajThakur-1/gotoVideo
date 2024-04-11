import React from 'react'
import LiveSongLinks from './LiveSongLinks'
import SideNavigationLayout from '../../component/ui/SideNavigationLayout'

type Props = {}
const linksData = [
  {
    id: "1",
    customerName: "john doe",
    longUrl: "https://example.com/long-url-1",
    createdAt: "sep 30",
    expireAt: "2023-11-01",
    customer: {
      email: "john.doe@example.com",
      phone: 1234567890,
      name: "john doe",
      clickCount: 100,
    },
    planDetails: {
      type: "basic",
      rateLimit: 1000,
      expiresAt: "2023-12-31",
    },
  },
  {
    id: "2",
    customerName: "alice smith",
    longUrl: "https://example.com/long-url-2",
    createdAt: "oct 30",
    expireAt: "2023-10-15",
    customer: {
      email: "alice.smith@example.com",
      phone: 9876543210,
      name: "alice smith",
      clickCount: 75,
    },
    planDetails: {
      type: "premium",
      rateLimit: 5000,
      expiresAt: "2023-11-30",
    },
  },
  {
    id: "3",
    customerName: "bob johnson",
    longUrl: "https://example.com/long-url-3",
    createdAt: "june 15",
    expireAt: "2023-09-20",
    customer: {
      email: "bob.johnson@example.com",
      phone: 5555555555,
      name: "bob johnson",
      clickCount: 50,
    },
    planDetails: {
      type: "standard",
      rateLimit: 2000,
      expiresAt: "2023-10-31",
    },
  },
  {
    id: "4",
    customerName: "eva williams",
    longUrl: "https://example.com/long-url-4",
    createdAt: "june 13",
    expireAt: "2023-08-05",
    customer: {
      email: "eva.williams@example.com",
      phone: 9998887777,
      name: "eva williams",
      clickCount: 30,
    },
    planDetails: {
      type: "premium",
      rateLimit: 5000,
      expiresAt: "2023-09-30",
    },
  },
  {
    id: "5",
    customerName: "david brown",
    longUrl: "https://example.com/long-url-5",
    createdAt: "sep 25",
    expireAt: "2023-07-10",
    customer: {
      email: "david.brown@example.com",
      phone: 1112223333,
      name: "david brown",
      clickCount: 20,
    },
    planDetails: {
      type: "basic",
      rateLimit: 1000,
      expiresAt: "2023-08-31",
    },
  },
  {
    id: "6",
    customerName: "linda davis",
    longUrl: "https://example.com/long-url-6",
    createdAt: "sep 16",
    expireAt: "2023-06-15",
    customer: {
      email: "linda.davis@example.com",
      phone: 7776665555,
      name: "linda davis",
      clickCount: 10,
    },
    planDetails: {
      type: "standard",
      rateLimit: 2000,
      expiresAt: "2023-07-31",
    },
  },
];
const linkDetail = {
  id: "1",
  customerName: "moahn doe",
  longUrl: "https://example.com/long-url-1",
  createdAt: "sep 30",
  expireAt: "2023-11-01",
  customer: {
    email: "john.doe@example.com",
    phone: 1234567890,
    name: "john doe",
    clickCount: 100,
  },
  planDetails: {
    type: "basic",
    rateLimit: 1000,
    expiresAt: "2023-12-31",
  },
}
const LiveSongLinksWrapper = (props: Props) => {
  return (
    <div>
      <SideNavigationLayout>
        <LiveSongLinks linksData={linksData} linkDetail={linkDetail} />
      </SideNavigationLayout>
    </div>
  )
}

export default LiveSongLinksWrapper