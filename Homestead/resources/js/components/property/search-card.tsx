import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function FilterCard() {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-4">Find Your Property</h2>

            {/* Search by Keywords */}
            <div className="mb-4">
                <Label htmlFor="keywords" className="text-sm mb-1 block">
                    Keywords
                </Label>
                <Input
                    type="text"
                    id="keywords"
                    placeholder="e.g., house, condo, lot, beachfront"
                    className="text-sm"
                />
            </div>

            {/* Select Location */}
            <div className="mb-4">
                <Label htmlFor="location-select" className="text-sm mb-1 block">
                    Location
                </Label>
                <Select>
                    <SelectTrigger id="location-select" className="w-full">
                        <SelectValue placeholder="Select City/Area" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Based on current location (Davao City, Davao Region, Philippines) */}
                        <SelectItem value="davao-city">Davao City</SelectItem>
                        <SelectItem value="samal-island">Samal Island</SelectItem>
                        <SelectItem value="digos-city">Digos City</SelectItem>
                        <SelectItem value="tagum-city">Tagum City</SelectItem>
                        <SelectItem value="remote">Anywhere in PH (Remote)</SelectItem>
                        {/* Add more specific barangays or districts for Davao if needed */}
                        <SelectItem value="lanang">Lanang, Davao City</SelectItem>
                        <SelectItem value="matina">Matina, Davao City</SelectItem>
                        <SelectItem value="mintal">Mintal, Davao City</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Property Type */}
            <div className="mb-4">
                <Label htmlFor="property-type-select" className="text-sm mb-1 block">
                    Property Type
                </Label>
                <Select>
                    <SelectTrigger id="property-type-select" className="w-full">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="house-lot">House & Lot</SelectItem>
                        <SelectItem value="condominium">Condominium</SelectItem>
                        <SelectItem value="lot-only">Lot Only</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="commercial">Commercial Property</SelectItem>
                        <SelectItem value="apartment">Apartment/Duplex</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
                <Label htmlFor="min-price" className="text-sm mb-1 block">
                    Price Range (PHP)
                </Label>
                <div className="flex items-center gap-2">
                    <Input type="number" id="min-price" placeholder="Min Price" className="w-1/2 text-sm" />
                    <span className="text-gray-500">-</span>
                    <Input type="number" id="max-price" placeholder="Max Price" className="w-1/2 text-sm" />
                </div>
                {/* Consider adding a range slider here for better UX if needed */}
            </div>

            {/* Number of Bedrooms */}
            <div className="mb-4">
                <Label htmlFor="bedrooms-select" className="text-sm mb-1 block">
                    Bedrooms
                </Label>
                <Select>
                    <SelectTrigger id="bedrooms-select" className="w-full">
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Number of Bathrooms */}
            <div className="mb-4">
                <Label htmlFor="bathrooms-select" className="text-sm mb-1 block">
                    Bathrooms
                </Label>
                <Select>
                    <SelectTrigger id="bathrooms-select" className="w-full">
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Lot Area (SqM) */}
            <div className="mb-4">
                <Label htmlFor="min-lot-area" className="text-sm mb-1 block">
                    Lot Area (sqm)
                </Label>
                <div className="flex items-center gap-2">
                    <Input type="number" id="min-lot-area" placeholder="Min Area" className="w-1/2 text-sm" />
                    <span className="text-gray-500">-</span>
                    <Input type="number" id="max-lot-area" placeholder="Max Area" className="w-1/2 text-sm" />
                </div>
            </div>

            {/* Floor Area (SqM) - primarily for House & Lot, Condos */}
            <div className="mb-4">
                <Label htmlFor="min-floor-area" className="text-sm mb-1 block">
                    Floor Area (sqm)
                </Label>
                <div className="flex items-center gap-2">
                    <Input type="number" id="min-floor-area" placeholder="Min Area" className="w-1/2 text-sm" />
                    <span className="text-gray-500">-</span>
                    <Input type="number" id="max-floor-area" placeholder="Max Area" className="w-1/2 text-sm" />
                </div>
            </div>

            {/* Other Features (Checkboxes) */}
            <div className="mb-4">
                <p className="text-sm mb-2">Features</p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="furnished" />
                        <Label htmlFor="furnished" className="text-sm font-normal">
                            Furnished
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="parking" />
                        <Label htmlFor="parking" className="text-sm font-normal">
                            Parking Space
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="swimming-pool" />
                        <Label htmlFor="swimming-pool" className="text-sm font-normal">
                            Swimming Pool
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="garden" />
                        <Label htmlFor="garden" className="text-sm font-normal">
                            Garden/Yard
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="gated-community" />
                        <Label htmlFor="gated-community" className="text-sm font-normal">
                            Gated Community
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="new-construction" />
                        <Label htmlFor="new-construction" className="text-sm font-normal">
                            New Construction
                        </Label>
                    </div>
                </div>
            </div>

            {/* Example: Property Status (e.g., For Sale, For Rent) */}
            <div className="mb-4">
                <Label htmlFor="property-status-select" className="text-sm mb-1 block">
                    Status
                </Label>
                <Select>
                    <SelectTrigger id="property-status-select" className="w-full">
                        <SelectValue placeholder="For Sale/Rent" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="for-sale">For Sale</SelectItem>
                        <SelectItem value="for-rent">For Rent</SelectItem>
                        <SelectItem value="pre-selling">Pre-selling</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}