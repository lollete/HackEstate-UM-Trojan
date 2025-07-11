import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";

export default function FilterCard (){



    return(
        <div className=" p-3">
        
            <Input type="text" placeholder="Search by Keywords.." className="text-sm mb-3"/>
            <Select>
                <p className="text-sm mb-1">Select Location</p>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Daveo</SelectItem>
                    <SelectItem value="dark">Somewhere</SelectItem>
                    <SelectItem value="system">Over There</SelectItem>
                </SelectContent>
            </Select>
        </div>

    )
}
