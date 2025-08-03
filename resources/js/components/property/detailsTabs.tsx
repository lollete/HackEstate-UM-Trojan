import * as React from 'react';
import { motion } from 'framer-motion'; // Using motion from framer-motion

// --- Utility Functions ---

// Simple utility for conditionally joining class names
function cn(...inputs: (string | undefined | null | boolean)[]): string {
    return inputs.filter(Boolean).join(' ');
}

// --- Mocked Shadcn/UI Tabs Components ---

// Tabs Context
interface TabsContextType {
    value: string;
    onValueChange: (newValue: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("useTabs must be used within a Tabs component");
    }
    return context;
};

// Tabs Component
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    onValueChange: (newValue: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ value, onValueChange, className, children, ...props }) => {
    const contextValue = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange]);

    return (
        <TabsContext.Provider value={contextValue}>
            <div className={cn("w-full", className)} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};
Tabs.displayName = "Tabs";

// TabsList Component
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> { }

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
                className
            )}
            role="tablist"
            {...props}
        >
            {children}
        </div>
    )
);
TabsList.displayName = "TabsList";

// TabsTrigger Component
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, value, children, ...props }, ref) => {
        const { value: activeValue, onValueChange } = useTabs();
        const isActive = activeValue === value;

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                    isActive && "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", // Explicitly apply active styles
                    className
                )}
                onClick={() => onValueChange(value)}
                data-state={isActive ? "active" : "inactive"}
                role="tab"
                aria-selected={isActive}
                id={`tab-${value}`}
                aria-controls={`panel-${value}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);
TabsTrigger.displayName = "TabsTrigger";

// TabsContent Component
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, value, children, ...props }, ref) => {
        const { value: activeValue } = useTabs();
        const isActive = activeValue === value;

        if (!isActive) {
            return null; // Only render content for the active tab
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    className
                )}
                role="tabpanel"
                id={`panel-${value}`}
                aria-labelledby={`tab-${value}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);
TabsContent.displayName = "TabsContent";


// --- AnimatedUnderlineTabsDemo Component ---
const tabs = [
    {
        name: 'Explore',
        value: 'explore',
        content: (
            <>
                Discover <span className='text-foreground font-semibold'>fresh ideas</span>, trending topics, and hidden gems
                curated just for you. Start exploring and let your curiosity lead the way!
            </>
        )
    },
    {
        name: 'Favorites',
        value: 'favorites',
        content: (
            <>
                All your <span className='text-foreground font-semibold'>favorites</span> are saved here. Revisit articles,
                collections, and moments you love, any time you want a little inspiration.
            </>
        )
    },
    {
        name: 'Surprise Me',
        value: 'surprise',
        content: (
            <>
                <span className='text-foreground font-semibold'>Surprise!</span> Here&apos;s something unexpected—a fun fact, a
                quirky tip, or a daily challenge. Come back for a new surprise every day!
            </>
        )
    }
];

const AnimatedUnderlineTabsDemo = () => {
    const [activeTab, setActiveTab] = React.useState('explore');
    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = React.useState({ left: 0, width: 0 });

    React.useLayoutEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.value === activeTab);
        const activeTabElement = tabRefs.current[activeIndex];

        if (activeTabElement) {
            const { offsetLeft, offsetWidth } = activeTabElement;

            setUnderlineStyle({
                left: offsetLeft,
                width: offsetWidth
            });
        }
    }, [activeTab]);

    return (
        <div className='w-full max-w-md p-4 bg-white rounded-lg shadow-lg'>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='gap-4'>
                <TabsList className='bg-background relative rounded-none border-b p-0'>
                    {tabs.map((tab, index) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            ref={el => {
                                tabRefs.current[index] = el;
                            }}
                            className='bg-background dark:data-[state=active]:bg-background relative z-10 rounded-none border-0 data-[state=active]:shadow-none px-4 py-2'
                        >
                            {tab.name}
                        </TabsTrigger>
                    ))}

                    <motion.div
                        className='bg-blue-600 absolute bottom-0 z-20 h-0.5' // Using blue-600 for primary color
                        layoutId='underline'
                        style={{
                            left: underlineStyle.left,
                            width: underlineStyle.width
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 40
                        }}
                    />
                </TabsList>

                {tabs.map(tab => (
                    <TabsContent key={tab.value} value={tab.value}>
                        <p className='text-gray-600 text-sm mt-4'>{tab.content}</p>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans antialiased">
            {/* Tailwind CSS CDN for quick setup */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Framer Motion CDN */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/framer-motion/11.2.10/framer-motion.min.js"></script>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Custom styles for shadcn/ui mocks if needed */
          .text-foreground {
            color: #1a202c; /* A dark gray for foreground text */
          }
          .bg-background {
            background-color: #ffffff; /* White background */
          }
          .text-muted-foreground {
            color: #6b7280; /* Gray for muted text */
          }
          .bg-primary {
            background-color: #2563eb; /* A blue color for primary elements */
          }
          .bg-muted {
            background-color: #f3f4f6; /* Light gray for muted backgrounds */
          }
        `}
            </style>
            <AnimatedUnderlineTabsDemo />
        </div>
    );
}
