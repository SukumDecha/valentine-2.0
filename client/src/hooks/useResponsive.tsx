import { Grid } from 'antd';

const useResponsive = () => {
    const screens = Grid.useBreakpoint();

    return {
        isMobile: screens.xs,
        isTablet: screens.sm,
        isDesktop: screens.md || screens.lg || screens.xl,
        screens,
    };
};

export default useResponsive;