import { Grid } from 'antd';

const useResponsive = () => {
    const screens = Grid.useBreakpoint();

    return {
        isMobile: screens.xs,
        isMiniTablet: screens.md && !screens.lg,
        isTablet: screens.sm || screens.md,
        isDesktop: screens.lg || screens.xl,
        screens,
    };
};

export default useResponsive;