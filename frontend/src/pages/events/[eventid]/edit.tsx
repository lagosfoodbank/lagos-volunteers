import React from "react";
import { useRouter } from "next/router";
import EventForm from "@/components/organisms/EventForm";
import CenteredTemplate from "@/components/templates/CenteredTemplate";
import Loading from "@/components/molecules/Loading";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/molecules/Card";
import DefaultTemplate from "@/components/templates/DefaultTemplate";

type eventData = {
  id: string;
  eventName: string;
  location: string;
  volunteerSignUpCap: string;
  eventDescription: string;
  imageURL: string;
  rsvpLinkImage: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  mode: string;
  status: string;
};

/** An EditEvent page */
const EditEvent = () => {
  const router = useRouter();
  const eventid = router.query.eventid as string;

  /** Tanstack query for fetching event data */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", eventid],
    queryFn: async () => {
      const { data } = await api.get(`/events/${eventid}`);
      return data["data"];
    },
  });
  let event: eventData = {
    id: data?.id,
    eventName: data?.name,
    location: data?.location,
    volunteerSignUpCap: data?.capacity,
    eventDescription: data?.description,
    imageURL: data?.imageURL || "",
    rsvpLinkImage: data?.rsvpLinkImage || "",
    startDate: data?.startDate,
    endDate: data?.endDate,
    startTime: data?.startDate,
    endTime: data?.endDate,
    mode: data?.mode,
    status: data?.status,
  };

  /** Loading screen */
  if (isLoading || !event.id) {
    return (
      <DefaultTemplate>
        <Loading />
      </DefaultTemplate>
    );
  }

  return (
    <CenteredTemplate>
      <Card size="medium">
        <EventForm eventType="edit" eventDetails={event} />
      </Card>
    </CenteredTemplate>
  );
};

export default EditEvent;
