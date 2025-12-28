import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Stepper } from '@/components/ui/stepper';
import { Home } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Progress } from '@/components/ui/progress';

export default function DesignSystemVerification() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-12 font-sans selection:bg-primary/10">
            <div className="max-w-6xl mx-auto space-y-20">

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-light tracking-tight text-primary">MUQI Design System</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl font-light">
                        A minimalist, exquisite design language focusing on fluidity, subtle interactions, and modern typography.
                    </p>
                </div>

                {/* Colors */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Palette & Tones</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <ColorSwatch name="Primary" bg="bg-primary" fg="text-primary-foreground" hex="#7A6E7D" />
                        <ColorSwatch name="Secondary" bg="bg-secondary" fg="text-secondary-foreground" hex="#F1EDEA" border />
                        <ColorSwatch name="Accent" bg="bg-accent" fg="text-accent-foreground" hex="#3E252B" />
                        <ColorSwatch name="Muted" bg="bg-muted" fg="text-white" hex="#A79EAD" />
                        <ColorSwatch name="Destructive" bg="bg-destructive" fg="text-destructive-foreground" hex="#A47681" />
                        <ColorSwatch name="Surface" bg="bg-card" fg="text-card-foreground" hex="#FBF8F8" border />
                    </div>
                </section>

                {/* State Control */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">State Control</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <ColorSwatch name="Info" bg="bg-info" fg="text-white" hex="#83A5C0" rounded="rounded-md" />
                        <ColorSwatch name="Success" bg="bg-success" fg="text-white" hex="#9FAE83" rounded="rounded-md" />
                        <ColorSwatch name="Warning" bg="bg-warning" fg="text-white" hex="#E4C88A" rounded="rounded-md" />
                        <ColorSwatch name="Error" bg="bg-error" fg="text-white" hex="#D98E8E" rounded="rounded-md" />
                    </div>
                </section>

                {/* Gray Colors */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Gray colors</h2>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-black shadow-sm" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Black</div>
                                <div className="text-muted-foreground">#000000</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-muqi-grayLegacy-1 shadow-sm" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Gray 1</div>
                                <div className="text-muted-foreground">#4D4652</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-muqi-grayLegacy-2 shadow-sm" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Gray 2</div>
                                <div className="text-muted-foreground">#615967</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-muqi-grayLegacy-3 shadow-sm" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Gray 3</div>
                                <div className="text-muted-foreground">#756D7D</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-muqi-grayLegacy-4 shadow-sm" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Gray 4</div>
                                <div className="text-muted-foreground">#8A8292</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-muqi-grayLegacy-5 shadow-sm" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Gray 5</div>
                                <div className="text-muted-foreground">#B5AEB8</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-muqi-grayLegacy-6 shadow-sm" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Gray 6</div>
                                <div className="text-muted-foreground">#D7D1DB</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-muqi-grayLegacy-7 shadow-sm border" />
                            <div className="text-center text-xs">
                                <div className="font-medium">Gray 7</div>
                                <div className="text-muted-foreground">#FBF8F8</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-lg bg-white shadow-sm border" />
                            <div className="text-center text-xs">
                                <div className="font-medium">White</div>
                                <div className="text-muted-foreground">#FFFFFF</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Selectors & Elements */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Selectors & Elements</h2>
                    <div className="grid md:grid-cols-4 gap-12">

                        {/* Checkbox */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Checkbox</h3>
                            <div className="flex flex-col gap-4 p-6 border border-dashed rounded-lg bg-card/30">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="chk-default" />
                                    <label htmlFor="chk-default" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Default</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="chk-checked" defaultChecked />
                                    <label htmlFor="chk-checked" className="text-sm font-medium leading-none">Checked</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="chk-disabled" disabled checked />
                                    <label htmlFor="chk-disabled" className="text-sm font-medium leading-none text-muted-foreground">Disabled</label>
                                </div>
                            </div>
                        </div>

                        {/* Radio Button */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Radio Button</h3>
                            <div className="p-6 border border-dashed rounded-lg bg-card/30">
                                <RadioGroup defaultValue="comfortable">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <RadioGroupItem value="default" id="r1" />
                                        <label htmlFor="r1" className="text-sm font-medium">Default</label>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <RadioGroupItem value="comfortable" id="r2" />
                                        <label htmlFor="r2" className="text-sm font-medium">Checked</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="compact" id="r3" disabled />
                                        <label htmlFor="r3" className="text-sm font-medium text-muted-foreground">Disabled</label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Toggle Button */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Toggle Button</h3>
                            <div className="flex flex-col gap-4 p-6 border border-dashed rounded-lg bg-card/30">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="s1" className="text-sm font-medium">Default</label>
                                    <Switch id="s1" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="s2" className="text-sm font-medium">Checked</label>
                                    <Switch id="s2" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between opacity-50">
                                    <label htmlFor="s3" className="text-sm font-medium">Disabled</label>
                                    <Switch id="s3" disabled />
                                </div>
                            </div>
                        </div>

                        {/* Sorting */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sorting</h3>
                            <div className="flex flex-col gap-4 p-6 border border-dashed rounded-lg bg-card/30 items-start">
                                <Select placeholder="Sort by ^" options={[
                                    { label: "A-Z", value: "az" },
                                    { label: "Rating ↑", value: "rating_asc" },
                                    { label: "Rating ↓", value: "rating_desc" },
                                ]} />
                            </div>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mt-12">
                        {/* Breadcrumbs */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Breadcrumbs</h3>
                            <div className="p-6 border border-dashed rounded-lg bg-card/30">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#"><Home className="h-4 w-4" /></BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">Detail</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Pricing</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pagination</h3>
                            <div className="p-6 border border-dashed rounded-lg bg-card/30">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">6</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationNext href="#" /></PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="space-y-4 mt-12 max-w-lg">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tabs</h3>
                        <Tabs defaultValue="section1" className="w-full">
                            <TabsList>
                                <TabsTrigger value="section1">Section 1</TabsTrigger>
                                <TabsTrigger value="section2">Section 2</TabsTrigger>
                            </TabsList>
                            <TabsContent value="section1">
                                <div className="p-4 border rounded-b-lg border-t-0 bg-card/50 text-sm text-muted-foreground">Content for Section 1</div>
                            </TabsContent>
                            <TabsContent value="section2">
                                <div className="p-4 border rounded-b-lg border-t-0 bg-card/50 text-sm text-muted-foreground">Content for Section 2</div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Progress Bar (Stepper) */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Progress Bar</h2>
                    <div className="p-12 border border-dashed rounded-lg bg-card/20 space-y-12">
                        {/* Stage 1: Initial */}
                        <div className="space-y-2">
                            <Stepper steps={["Step 1", "Step 2", "Step 3"]} currentStep={1} />
                        </div>

                        {/* Stage 2: Middle */}
                        <div className="space-y-2">
                            <Stepper steps={["Step 1", "Step 2", "Step 3"]} currentStep={2} />
                        </div>

                        {/* Stage 3: End */}
                        <div className="space-y-2">
                            <Stepper steps={["Step 1", "Step 2", "Step 3"]} currentStep={3} />
                        </div>
                    </div>
                </section>

                {/* Tooltips & Pickers */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Tooltips & Pickers</h2>
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Tooltip */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tooltip</h3>
                            <div className="p-12 border border-dashed rounded-lg bg-card/30 flex flex-row items-center justify-center gap-8">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="secondary">Hover Me (Top)</Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Tooltip content here.
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive">Hover Me (Error)</Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-[#A47681] after:border-t-[#A47681]">
                                            Tooltip content here.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>



                    </div>
                </section>

                {/* Buttons */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Interactive Elements</h2>
                    <div className="flex flex-wrap gap-6 items-center p-8 border rounded-lg bg-card/50">
                        <Button variant="default">Primary Action</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center p-8 border rounded-lg bg-card/50">
                        <Button size="sm" variant="outline">Small</Button>
                        <Button size="default" variant="outline">Default</Button>
                        <Button size="lg" variant="outline">Large Call to Action</Button>
                        <Button size="icon" variant="outline">✚</Button>
                    </div>
                </section>

                {/* Inputs */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Inputs & Forms</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                            <Input placeholder="name@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Disabled State</label>
                            <Input placeholder="Restricted input..." disabled />
                        </div>
                    </div>
                </section>

                {/* Cards & Surfaces */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-medium tracking-tight border-b pb-2">Surfaces & Modals</h2>
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Product Card Example */}
                        <Card className="w-full max-w-sm mx-auto transition-all hover:shadow-md">
                            <div className="aspect-[4/3] bg-muted relative overflow-hidden rounded-t-lg group">
                                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-muted-foreground/50 text-sm">
                                    Image Placeholder
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg">Velvet Armchair</CardTitle>
                                <CardDescription>Timeless elegance for your living room.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    Crafted from premium materials, this piece embodies the MUQI philosophy of Gentle Indifference.
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <span className="font-semibold text-lg">$299</span>
                                <Button size="sm">Add to Cart</Button>
                            </CardFooter>
                        </Card>

                        {/* Modal Popout Representation */}
                        <div className="relative flex items-center justify-center p-12 bg-muted/20 rounded-lg border border-dashed">
                            <Card className="w-full max-w-xs shadow-xl scale-100 ring-1 ring-black/5">
                                <CardHeader>
                                    <CardTitle>Confirm Action</CardTitle>
                                    <CardDescription>Are you sure you want to proceed?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">This action cannot be undone. This will permanently delete your account and remove your data.</p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-3">
                                    <Button variant="outline" size="sm">Cancel</Button>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </CardFooter>
                            </Card>
                        </div>

                    </div>
                </section>

            </div >
        </div >
    );
}

function ColorSwatch({ name, bg, fg, hex, border, rounded = "rounded-lg" }: { name: string, bg: string, fg: string, hex: string, border?: boolean, rounded?: string }) {
    return (
        <div className={`space-y-2 group cursor-default`}>
            <div className={`h-24 w-full ${rounded} ${bg} ${border ? 'border' : ''} shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md relative flex items-center justify-center`}>
                <span className={`${fg} opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs`}>{hex}</span>
            </div>
            <div>
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-muted-foreground uppercase">{hex}</p>
            </div>
        </div>
    )
}
