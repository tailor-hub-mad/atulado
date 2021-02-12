import { postConnector, getConnector } from "../connector";
import {
  API_VERSION,
  COMPANY_ID,
  PASSWORD_MUST_HAVE,
} from "../../utils/constants";

import _ from "lodash";

export const setFriendInvite = async (roleCode, UserId, friendInfo) => {
  try {
    const { data } = await postConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/Amigo/Invite`,
      friendInfo
    );

    if (!data.Succeeded) {
      return { error: data.Errors[0] };
    } else {
      return { data };
    }
  } catch (error) {
    throw error;
  }
};

export const getFriendBalance = async (roleCode, UserId) => {
  try {
    return await getConnector(
      `/api/${API_VERSION}/${COMPANY_ID}/${roleCode}/Account/${UserId}/Amigo/Balance`
    );
  } catch (error) {
    throw error;
  }
};
