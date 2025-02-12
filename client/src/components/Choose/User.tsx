"use client"
import { useState, useEffect } from 'react'
import { getUserData } from '@/services/user.service'
import { UserDataResponse } from '@/types/service/main'

const User = ({ uuid_slug }: { uuid_slug: string }) => {
    const [userData, setUserData] = useState<UserDataResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getUserData(uuid_slug);
            if (data.success) {
                setUserData(data);
            } else {
                setError(data.message || "Failed to fetch user data");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [uuid_slug]);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>User Data {uuid_slug}</h2>
            {userData?.trackId && (
                <div>
                    <h3>Track Information</h3>
                    <p><strong>Track ID:</strong> {userData.trackId}</p>
                    {userData.trackImage && (
                        <img src={userData.trackImage} alt="Track" width="200" />
                    )}
                </div>
            )}

            {userData?.images && userData.images.length > 0 && (
                <div>
                    <h3>Uploaded Images</h3>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {userData.images.map((image, index) => (
                            <div key={index} style={{ textAlign: "center" }}>
                                <img src={image.url} alt={`Uploaded ${index}`} width="150" />
                                <p>{image.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default User