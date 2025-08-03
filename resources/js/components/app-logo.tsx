import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center space-x-2">
            <AppLogoIcon className="h-10 w-auto" />
            <div className="grid text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold"></span>
            </div>
        </div>
    );
}
