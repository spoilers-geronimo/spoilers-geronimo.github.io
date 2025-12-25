import { ReactNode } from 'react';

interface BookPageProps {
    children: ReactNode;
    className?: string;
    backContent?: ReactNode;
}

export const BookPageLeft = ({ children, className = '', backContent }: BookPageProps) => {
    return (
        <div className={`book-page-left relative p-5 sm:p-8 lg:p-10 border-r border-border/30 ${className}`}>
            {/* Page texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />

            {/* Page curl effect */}
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-muted/50 to-transparent pointer-events-none hidden lg:block" />

            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>

            {/* Back Content (Revealed when flipping) */}
            {backContent && (
                <div
                    className="absolute inset-0 overflow-hidden backface-hidden"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', zIndex: 100, background: '#fdfbf7' }}
                >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />
                    <div className="p-5 sm:p-8 lg:p-10 border-l border-border/30 h-full relative">
                        {backContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export const BookPageRight = ({ children, className = '', backContent }: BookPageProps) => {
    return (
        <div className={`book-page-right relative p-5 sm:p-8 lg:p-10 bg-background ${className}`}>
            {/* Page texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />

            {/* Page curl effect */}
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-muted/50 to-transparent pointer-events-none hidden lg:block" />

            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>

            {/* Back Content (Revealed when flipping) */}
            {backContent && (
                <div
                    className="absolute inset-0 overflow-hidden backface-hidden"
                    style={{ transform: 'rotateY(-180deg)', backfaceVisibility: 'hidden', zIndex: 100, background: '#fdfbf7' }}
                >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />
                    <div className="p-5 sm:p-8 lg:p-10 border-r border-border/30 h-full relative">
                        {backContent}
                    </div>
                </div>
            )}
        </div>
    );
};
