import { memo, type ComponentType, type SVGProps } from 'react';
import { Github, ArrowUpRight, Twitter, Tv, MessageSquare, Rss } from 'lucide-react';

type FooterSection = {
    title: string;
    links: string[];
};

const footerLinks: FooterSection[] = [
    {
        title: 'Product',
        links: ['Browser Agents', 'Automation Platform', 'Data Extraction', 'Pricing']
    },
    {
        title: 'Resources',
        links: ['Documentation', 'API Reference', 'Case Studies', 'Blog']
    },
    {
        title: 'Company',
        links: ['About Us', 'Partners', 'Careers', 'Media Kit']
    }
];

type SocialLink = {
    href: string;
    title: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const socialLinks: SocialLink[] = [
    // lucide doesn't ship brand icons for every Chinese platform; use representative icons
    { href: 'https://weibo.com/galaxyeye', title: 'Weibo', Icon: Rss },
    { href: 'https://mp.weixin.qq.com/s/cKmu1E9WerpKLiJORiVImg', title: 'Weixin', Icon: MessageSquare },
    { href: 'https://www.bilibili.com/video/BV1kM2rYrEFC', title: 'Bilibili', Icon: Tv },
    { href: 'https://github.com/platonai', title: 'GitHub', Icon: Github },
    { href: 'https://twitter.com/galaxyeye8', title: 'Twitter', Icon: Twitter }
];

const FooterComponent = () => {
    return (
        <footer className="relative bg-slate-50 text-slate-900 border-t border-slate-200 dark:bg-slate-950 dark:text-white dark:border-slate-900">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
                <div className="bg-gradient-to-r from-sky-100 via-violet-100 to-emerald-100 border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200/40 dark:from-sky-500/10 dark:via-violet-500/10 dark:to-emerald-500/10 dark:border-slate-800 dark:shadow-none">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] mb-2">Ready to launch</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Build the agent era with Browser4</h3>
                        <p className="text-slate-600 dark:text-slate-300">Book a demo or request a POC to see how Browser4 plugs into your workflows.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold shadow-md shadow-sky-500/30">Book a demo</button>
                        <button className="px-6 py-3 border border-slate-200 text-slate-900 rounded-xl font-semibold hover:border-slate-400 dark:border-slate-700 dark:text-white/80 dark:hover:border-slate-500">Download whitepaper</button>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Browser<span
                            className="text-sky-500">4</span></h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            Browser infrastructure engineered for the agent era—building a fair, sustainable ecosystem.
                        </p>
                        <div className="flex gap-3">
                            <div className="md:col-span-1" data-aos="fade-up" data-aos-delay="100">
                                <div className="contact-about">
                                    <div className="social-links flex gap-3">
                                        {socialLinks.map((s) => (
                                            <a
                                                key={s.href}
                                                href={s.href}
                                                title={s.title}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={s.title}
                                                className="text-slate-600 hover:text-sky-500 transition flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800"
                                            >
                                                <s.Icon className="w-5 h-5" aria-hidden="true" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <a href="https://mp.weixin.qq.com/s/cKmu1E9WerpKLiJORiVImg" target="_blank" rel="noopener noreferrer" aria-label="Weixin article">
                                        <img
                                            src="https://mp.weixin.qq.com/mp/qrcode?scene=10000004&size=102&__biz=MzkwMzQxMzkwOQ==&mid=2247483674&idx=1&sn=6b0ff9ee28095a1881133bb019957666&send_time="
                                            alt="微信公众号二维码"
                                            loading="lazy"
                                            className="w-24 h-24 object-contain"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#"
                                           className="group/footerlink text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition flex items-center gap-2"
                                        >
                                            <span>{link}</span>
                                            <ArrowUpRight
                                                className="w-3 h-3 opacity-0 group-hover/footerlink:opacity-100 transition"/>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div
                    className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} Browser4. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-sky-600 dark:hover:text-sky-300">Privacy</a>
                        <a href="#" className="hover:text-sky-600 dark:hover:text-sky-300">Terms</a>
                        <a href="#" className="hover:text-sky-600 dark:hover:text-sky-300">Contact</a>
                        <a
                            href="https://github.com/galaxyeye/browser4.top/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-600 dark:hover:text-sky-300"
                        >
                            Edit on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export const Footer = memo(FooterComponent);
export default Footer;
