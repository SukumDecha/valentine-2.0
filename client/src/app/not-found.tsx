'use client'

import type React from "react"
import { Result, Button, Typography } from "antd"
import { IconHeart } from "@tabler/icons-react"

const { Title, Paragraph } = Typography

const NotFound: React.FC = () => {
    return (
        <Result
            icon={<IconHeart style={{ fontSize: 72, color: "#ff69b4" }} />}
            title={
                <Title level={2} style={{ color: "#ff1493" }}>
                    404 - Love Not Found
                </Title>
            }
            subTitle={
                <Paragraph style={{ fontSize: 18, color: "#ff69b4" }}>Oops! It seems Cupid's arrow missed this page.</Paragraph>
            }
            extra={
                <Button type="primary" size="large" style={{ backgroundColor: "#ff1493", borderColor: "#ff1493" }}>
                    Return to Love
                </Button>
            }
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff0f5",
            }}
        />
    )
}

export default NotFound

