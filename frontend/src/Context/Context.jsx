import React, {useState, useEffect} from "react";
import axios from "axios"
import { createContext } from "react";

export const UserContext = createContext({});

export function UseContextProvider({children}) {
	const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await axios.get(`/auth/profile/${userId}`)
			    setUser(response.data);
			} catch (error) {
				console.error("Error fetching user details:", error);
			}
		}
		fetchUserDetails();
	}, [userId])
	return (
		<UserContext.Provider value={{ user, userId, setUser, setUserId}}>
		  {children}
		</UserContext.Provider>
	  );
}
