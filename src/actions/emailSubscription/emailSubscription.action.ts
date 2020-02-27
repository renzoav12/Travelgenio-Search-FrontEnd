import { IEmailSubscriptionRequest } from "@hotels/header/dist/interfaces";
import emailSubscription from "../../api/emailSubscription/emailSubscription";

export const subscribeEmail = async (emailSubscriptionRequest: IEmailSubscriptionRequest): Promise<void> => {
  const url = `${emailSubscriptionRequest.url}/cd,c2-sin,-5-${emailSubscriptionRequest.cultureCode},${emailSubscriptionRequest.cobrandId},${emailSubscriptionRequest.email}`;
  return emailSubscription.post(url, {});
};