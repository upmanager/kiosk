<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Group;
use Illuminate\Validation\Rule;
class GroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'name' => [
                'required',
                Rule::unique((new Group)->getTable())->ignore($this->route()->group->id ?? null)
            ]
        ];
    }
}
