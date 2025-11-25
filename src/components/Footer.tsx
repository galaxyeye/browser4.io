import { Github, Mail, Globe, ArrowUpRight } from 'lucide-react';

const footerLinks = [
    {
        title: '产品',
        links: ['Browser Agents', '自动化平台', '数据提取', '定价方案']
    },
    {
        title: '资源',
        links: ['文档', 'API 参考', '案例研究', '博客']
    },
    {
        title: '公司',
        links: ['关于我们', '合作伙伴', '加入我们', '媒体资源']
    }
];

export default function Footer() {
    return (
        <footer className="relative bg-slate-950 border-t border-slate-900">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
                <div className="bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-emerald-500/10 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-sm text-slate-400 uppercase tracking-[0.3em] mb-2">Ready to launch</p>
                        <h3 className="text-3xl font-bold text-white mb-2">与 Browser4 一起构建智能体时代</h3>
                        <p className="text-slate-400">预约演示或申请 POC，了解 Browser4 如何接入你的业务。</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold">预约演示</button>
                        <button className="px-6 py-3 border border-slate-700 text-white/80 rounded-xl font-semibold hover:border-slate-500">下载白皮书</button>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">Browser<span className="text-sky-400">4</span></h3>
                        <p className="text-slate-400 mb-4 leading-relaxed">
                            为智能体时代打造的浏览器基础设施，构建公平、可持续的智能体生态。
                        </p>
                        <div className="flex gap-3">
                            {[Github, Mail, Globe].map((Icon) => (
                                <a
                                    key={Icon.name}
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/50 transition"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-slate-400 hover:text-sky-400 transition flex items-center gap-2">
                                            <span>{link}</span>
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/footerlink:opacity-100 transition" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Browser4. 保留所有权利。</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-sky-400">隐私政策</a>
                        <a href="#" className="hover:text-sky-400">服务条款</a>
                        <a href="#" className="hover:text-sky-400">联系我们</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
