import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/selectDark"

const Page = () => {

    return (
        <div className="text-white bg-black">
            <h2>Settings Page</h2>
            <Select
            // onValueChange={field.onChange} 
            // defaultValue={field.value}
            >
                <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
            </Select>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum corrupti tempora at nam eos amet, necessitatibus saepe est et ea?</p>
        </div>
    )
}

export default Page